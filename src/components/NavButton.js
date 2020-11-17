import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { IconContext } from "react-icons";

const Button = styled.button`
  display: flex;
  font-weight: 600;
  align-items: center;
  background-color:  #F2EBE5;
  color: ${(props) => props.color};
  border: 2px solid #F2EBE5;
  border-radius: 20px;
  font-size: ${(props) => props.size};
  padding: 10px;
  box-shadow: 0 2px 5px -1px rgba(0, 0, 0, 0.3);
  &:active,
  &:focus {
    outline: none;
  }
  @media (max-width: 768px) {
    margin: 0.5rem 0;
  }
`;

const Text = styled.span`
  margin-left: 0.5rem;
`;

const NavButton = (props) => {
  return (
    <Button {...props}>
      <IconContext.Provider value={{ color: props.color, size: "1.25rem" }}>
        {props.icon}
      </IconContext.Provider>
      <Text>{props.text}</Text>
    </Button>
  );
};

NavButton.propTypes = {
  icon: PropTypes.object,
  text: PropTypes.string.isRequired,
  size: PropTypes.string,
  color: PropTypes.string.isRequired,
  borderColor: PropTypes.string,
};

NavButton.defaultProps = {
  icon: null,
  size: "1rem",
};

export default NavButton;
