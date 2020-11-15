import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

const Container = styled(({ color, border, ...rest }) => <div {...rest} />)`
  display: flex;
  padding: 1rem 1.5rem;
  margin: 0.75rem;
  border-radius: 0.5rem;
  color: ${(props) => props.color};
  box-shadow: 0 0 5px 2px ${(props) => props.border};
  border: 1px solid ${(props) => props.border};
  cursor: pointer;
  user-select: none;
  &:active,
  &:focus {
    box-shadow: 0 0 5px 1px ${(props) => props.border};
  }
`;

const Text = styled.p`
  min-width: 100px;
  flex-grow: 1;
  white-space: nowrap;
  text-align: center;
  margin-bottom: 0;
`;

const TextQuickReply = ({ text, color, border, onClick }) => {
  return (
    <Container color={color} border={border} onClick={onClick}>
      <Text>{text}</Text>
    </Container>
  );
};

TextQuickReply.propTypes = {
  text: PropTypes.string.isRequired,
  color: PropTypes.string,
  border: PropTypes.string,
};

TextQuickReply.defaultProps = {
  color: "#5c6bce",
  border: "#bfc8ff",
};

export default TextQuickReply;
