import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import userImage from "../../images/user.jpg";
import firebase from 'firebase';

const ChatContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  margin: 0.5rem 0;
  @media (max-width: 576px) {
    margin: 1rem 0;
  }
`;

const ChatImg = styled.img`
  order: 1;
  width: 80px;
  border-radius: 50%;
  align-self: flex-end;
  margin-left: 1.25rem;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.5);
  @media (max-width: 768px) {
    width: 75px;
    margin-left: 1rem;
  }
  @media (max-width: 576px) {
    width: 50px;
    margin-left: 0.5rem;
  }
`;

const ChatText = styled.div`
  max-width: 75%;
  background-color: #3F3250;
  color: white;
  border-radius: 5px;
  padding: 10px 20px;
  box-shadow: 0 2px 5px -2px rgba(0, 100, 162, 0.3);
`;

const UserMessage = ({ text, image = userImage }) => {
  return (
    <ChatContainer>
      <ChatImg src =  {firebase.auth().currentUser.photoURL ? firebase.auth().currentUser.photoURL : image}  alt="user profile" />
      <ChatText>{text}</ChatText>
    </ChatContainer>
  );
};

UserMessage.propTypes = {
  text: PropTypes.string.isRequired,
  image: PropTypes.string,
};

export default UserMessage;