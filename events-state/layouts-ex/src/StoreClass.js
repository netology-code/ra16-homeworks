import React from "react"; 
import CardsView from "./CardsView";
import ListView from "./ListView";
import IconSwitch from "./IconSwitch";
import { products } from "./products";


class StoreClass extends React.Component {
  constructor() {
    super();
    const view_list = [ "xs" ,"sm" , "md", "lg" ];
    this.state = {
      icon: view_list,
      products: products,
      proj: products,
    };
  }

  handleSelectFilter = (e) => {
    this.setState({
      e: products.filter((product) => product.name)
    });
}
   // handleList = (e) => {this.setState({ e: e })};
  
  render() {
    
    return (
      <div className="container">
        <IconSwitch
          icon={["xs", "sm", "md", "lg"]}
          onSwitch={() => this.handleSelectFilter()}
        />
        <ListView state={this.state} />
      </div>
    );
  }
}

export default StoreClass;
