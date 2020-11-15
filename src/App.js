import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Route } from "react-router-dom";
import Main from './Main';
import Home from './components/Home';


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
