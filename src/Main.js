import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Home from './components/Home';
import Layout from './containers/Layout';


class Main extends React.Component {
    constructor (props) {
          super(props);
          this.state = {};
    }
    
  
    componentDidMount () {}
    
    render(){
      return (
        <div>
            <Switch>
                <Route exact path='/' component={Home} />
                <Route exact path='/layout' component={Layout} />
            </Switch>
        </div>

      );
    }
  };
  
  export default Main;