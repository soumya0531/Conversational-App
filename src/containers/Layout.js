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
    background-repeat: no-repeat; 
    background-size: cover;
    overflow: hidden;
    padding: 10px 300px;
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
    padding: 6rem ;
    height: 500px;
    overflow-y:auto;
    margin: 0 auto;
    @media(max-width: 992px) {
      width: 80%;
      padding: 6rem 0;
    }
  }
  .chat{
    width: 900px;
    margin: 100px auto;
    background-color: #F7F3F5;
    border-radius: 10px;
    
  }
  .chat-footer{
    position: absolute;
    bottom:0;
    width: 900px;
    margin: 0 auto;
  }

  .chat-header{
    position: sticky;
    top:0;
    width: 900px;
    margin: 0 auto;
  }
`;


const Layout = () => {
  const ref = useRef(null);
  const scrollToBottom = (direct = false) => {
    // passing direct to this forces scrolling instantly, instead of animating.
    if (ref.current?.scrollIntoView) {
      ref.current.scrollIntoView({ behavior: direct ? "auto" : "smooth" });
    }
  };
  useEffect(() => {
    scrollToBottom();
  });
  return (
    <Fragment>
      <GlobalStyle />
      <div className="chat">
      <div className="chat-header">
      <ChatHeader />
      </div>
      <main><ChatContainer /><div
        ref={ref} /></main>
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
