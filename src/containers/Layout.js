import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { createGlobalStyle } from "styled-components";

import ChatHeader from "./ChatHeader";
import ChatFooter from "./ChatFooter";
import ChatContainer from "./ChatContainer";

const GlobalStyle = createGlobalStyle`
  body {
    font-family: 'Roboto', sans-serif;
    font-weight: 400;
    background-color: #F7F3F5;
  }
  h1, h2, h3, h4, h5, h6 {
    font-weight: 700;
  }
  main {
    width: 60%;
    padding: 6rem 0;
    margin: 0 auto;
    @media(max-width: 992px) {
      width: 80%;
      padding: 6rem 0;
    }
  }
  .chat{
    width: 900px;
    margin: 100px auto;
    background-color: lightpink;
    
  }
  .chat-footer{
    position: fixed;
  bottom: 0;
  width: 900px;
  }
`;

const Layout = () => {
  return (
    <Fragment>
      <GlobalStyle />
      <div className="chat">
      <ChatHeader />
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
