import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

import botImage from "../../images/bot.jpg";

const ChatContainer = styled.div`
  display: flex;
  margin: 1.25rem 0;
`;

const ChatImg = styled.img`
  align-self: flex-end;
  width: 65px;
  border-radius: 50%;
  margin-right: 1.25rem;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.5);
  @media (max-width: 768px) {
    width: 65px;
    margin-right: 1rem;
  }
  @media (max-width: 576px) {
    width: 65px;
    margin-right: 0.5rem;
  }
`;

const ChatTextContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  justify-content: center;
  max-width: 50%;
`;

const ChatText = styled.div`
  align-self: flex-start;
  background-color: #ACBFE6;
  border-radius: 5px;
  color: #3d0c02;
  margin: 0.5rem 0;
  padding: 10px 20px;
  box-shadow: 0 2px 5px -2px rgba(0, 100, 162, 0.3);
  &:first-child {
    margin-top: 0;
  }
  &:last-child {
    margin-bottom: 0;
  }
`;

const BotMessage = ({ text, image = botImage }) => {
  return (
    <ChatContainer>
      <ChatImg src={image} alt="bot message" />
      <ChatTextContainer>
        {text.map((item, i) => (
          <ChatText key={i}>{item}</ChatText>
        ))}
      </ChatTextContainer>
    </ChatContainer>
  );
};

BotMessage.propTypes = {
  text: PropTypes.array.isRequired,
  image: PropTypes.string,
};

export default BotMessage;
