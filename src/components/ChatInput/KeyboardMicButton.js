import React, { Fragment } from "react";
import styled from "styled-components";
import { IconContext } from "react-icons";
import { FaRegKeyboard, FaMicrophoneAlt } from "react-icons/fa";

const ButtonContainer = styled.div`
  width: 8rem;
  display: flex;
  justify-content: space-between;
  padding: 0.75rem 2rem;
  margin: 0 auto;
  border: 1px solid #3a3a3a;
  border-radius: 500px;
  box-shadow: 1px 2px 5px rgba(0, 0, 0, 0.4);
  &:active,
  &:focus {
    box-shadow: 0px 0px 3px rgba(0, 0, 0, 0.4);
  }
`;

const KeyboardMicButton = (props) => {
  return (
    <Fragment>
      <ButtonContainer onClick={props.onClick}>
        <IconContext.Provider value={{ color: "#3a3a3a", size: "24px" }}>
          <span>
            <FaRegKeyboard />
          </span>
          <span>
            <FaMicrophoneAlt />
          </span>
        </IconContext.Provider>
      </ButtonContainer>
    </Fragment>
  );
};

export default KeyboardMicButton;
