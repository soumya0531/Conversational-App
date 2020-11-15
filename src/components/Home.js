import React, { Fragment } from 'react';
import { Link, Redirect } from 'react-router-dom';
import firebase from 'firebase';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import './Home.css';
import {auth, GoogleProvider} from '../api/firebase'
import Layout from '../containers/Layout';

    class Home extends React.Component {

  state = { isSignedIn: false }
  uiConfig = {
    signInFlow: "popup",
    signInOptions: [
      firebase.auth.GoogleAuthProvider.PROVIDER_ID,
      firebase.auth.EmailAuthProvider.PROVIDER_ID
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
        <div className="App">
        {this.state.isSignedIn ? (
            <Fragment>
            <Layout />
          </Fragment>
        ) : (
          <StyledFirebaseAuth
            uiConfig={this.uiConfig}
            firebaseAuth={firebase.auth()}
          />
        )}
        </div>
      );
    }
  };

export default Home;