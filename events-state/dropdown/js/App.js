var App = React.createClass({
  defaultProps: {
    options: []
  },
  getInitialState: function () {
    return {
      active: this.props.options[0],
      open: false
    };
  },
  handleChange: function (option) {
    this.setState({
      active: option
    });
  },
  toggleOpen: function () {
    this.setState({
      open: !this.state.open
    });
  },
  render: function () {
    return (
      <div className="container">
        <div className={`dropdown-wrapper ${this.state.open ? "open" : ""}`} >
          <button className={"btn"} onClick={this.toggleOpen} >
            <span>Account Settings</span>
            <i className="material-icons">public</i>
          </button>
          <ul className="dropdown">
            {this.props.options.map((option, i) => (
              <li
                className={option === this.state.active ? "active" : ""}
                onClick={() => this.handleChange(option)} >
                  <a href="#">{option}</a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
  }
});
