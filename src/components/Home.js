import React, { Fragment } from 'react';
import { Link, Redirect } from 'react-router-dom';
import firebase from 'firebase';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import './Home.css';
import {auth, GoogleProvider} from '../api/firebase'
import Layout from '../containers/Layout';
import logo from '../images/logo.gif';


    class Home extends React.Component {

  state = { isSignedIn: false }
  uiConfig = {
    signInFlow: "popup",
    signInOptions: [
      firebase.auth.EmailAuthProvider.PROVIDER_ID,
      firebase.auth.GoogleAuthProvider.PROVIDER_ID,

    ],
    callbacks: {
      signInSuccess: () => false
    }
  }
    
  
    componentDidMount = () => {
        firebase.auth().onAuthStateChanged(user => {
            this.setState({ isSignedIn: !!user })
            console.log("user", user)
          })
    }
    
    render(){
      return (
        <div>
        
          {this.state.isSignedIn ? (
            <Fragment>
             <Layout />
            </Fragment>
          ) : (
            <div className="limiter">
              <div className='container-login100'>
                <div className="wrap-login100">
                  <form className="login100-form validate-form">
                      <img className="login100-form-logo" src = { logo } alt = '!'></img>
                    <span className="login100-form-title p-b-34 p-t-27">
                      Log in
                    </span>
                    <StyledFirebaseAuth
                      uiConfig={this.uiConfig}
                      firebaseAuth={firebase.auth()}
                    />
                  </form>
                </div>
              </div>
            </div>
                        
          )}
          
        </div>
      );
    }
  };

export default Home;