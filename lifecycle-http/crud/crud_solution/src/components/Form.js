import React from 'react';

class Form extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        return(
            <form>
                <input type="text"/>
                <button>Send</button>
            </form>
        )
    }
}

export default Form;
