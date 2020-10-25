import React, { Component } from "react";


export default class Fetchui extends Component {
  constructor(props){
      super(props)
    this.state = {
        isLoading: false,
        items: [] , 
        debarquement :   null 
      };
      
  
  }
   

  async componentDidMount() {
    this.setState({ isLoading: true });
    const url = "http://localhost:8881/api/ui/in";
    const response = await fetch(url);
    const json = await response.json();
    
    this.setState({
      isLoading:false , 
      items:  json.items  , 
      debarquement : this.filtter_val(json.items , "debarquement")
      
    })

     // this.debarquement  = this.filtter_val(this.state.items,"debarquement")
     console.log(this.state.debarquement.title)
  }

  filtter_val(arr, type) {
    return arr.find((item) => {
      return item.title === type;
    });
  }
  render() {
    if (this.state.isLoading || this.state.debarquement==null )  {
      return <div>loading...</div>;
    }

   

   

    return (
    
      <div>
        <div>{this.state.debarquement.title}</div>
      </div>
    );
  }
}
