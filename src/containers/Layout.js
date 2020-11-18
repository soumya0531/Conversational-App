import React, { Fragment, useRef, useEffect } from "react";
import PropTypes from "prop-types";
import { createGlobalStyle } from "styled-components";
import background from '../images/background.jpg';
import ChatHeader from "./ChatHeader";
import ChatFooter from "./ChatFooter";
import ChatContainer from "./ChatContainer";

const GlobalStyle = createGlobalStyle`
  body {
    font-family: 'Roboto', sans-serif;
    font-weight: 400;
    background-image: url(${ background });
    background-position: center;
    background-size: cover;
    width:100%;
    padding:10px 0;
    overflow:hidden;
  }
  h1, h2, h3, h4, h5, h6 {
    font-weight: 700;
  }
  ::-webkit-scrollbar {
    width: 10px;
  }
  
  ::-webkit-scrollbar-track {
    box-shadow: inset 0 0 5px grey; 
    border-radius: 10px;
  }
   
  ::-webkit-scrollbar-thumb {
    background: #3F3250; 
    border-radius: 10px;
  }
  
  main {
    width: 100%;
    padding: 2rem ;
    height: 500px;
    overflow-y:auto;
   
  }
  .chat{
    width: 900px;
    margin: 3rem auto;
    background-color: #F7F3F5;
    border-radius: 10px;

    @media (max-width: 900px){
      width: 90%;
    }   
    
  }
  .chat-footer{
    position: sticky;
    bottom:0;
    width: 100%;
    
  }

  .chat-header{
    position: sticky;
    top:0;
    width: 100%;
    border-radius: 10px;    
  }
`;


const Layout = () => {
  return (
    <Fragment>
      <GlobalStyle />
      <div className="chat">
        <div className="chat-header">
          <ChatHeader />
        </div>
        <main><ChatContainer /></main>
        <div className="chat-footer">
          <ChatFooter />
        </div>
      </div>
    </Fragment>
  );
};

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;
