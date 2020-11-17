import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter } from "react-router-dom";
import Main from './Main';


class App extends React.Component {
  constructor (props) {
		super(props);
    this.state = {};
  }
  

  componentDidMount () {}
  
  render(){
    return (
      <BrowserRouter>
        <Main />
      </BrowserRouter>
    );
  }
};
export default App;
