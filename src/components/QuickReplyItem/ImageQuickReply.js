import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

const Box = styled(({ size, color, border, ...rest }) => <div {...rest} />)`
  height: ${(props) => props.size};
  width: ${(props) => props.size};
  color: ${(props) => props.color};
  border: 1px solid ${(props) => props.border};
  box-shadow: 0 0 5px 3px ${(props) => props.border};
  margin: 1rem;
  background-color: #fff;
  padding: 20px;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  &:nth-child(1) {
    color: #00ee5f;
    box-shadow: 0 0 5px 2px #e3f2e9;
  }
  &:nth-child(2) {
    color: #0035ef;
    box-shadow: 0 0 5px 2px #d2dcff;
  }
  &:nth-child(3) {
    color: #edbc00;
    box-shadow: 0 0 5px 2px #fbedb7;
  }
  &:nth-child(4) {
    color: #5c6bce;
    box-shadow: 0 0 5px 2px #bfc8ff;
  }
  &:nth-child(5) {
    color: #ef2000;
    box-shadow: 0 0 5px 2px #ffd9d3;
  }
  &:active,
  &:focus {
    box-shadow: 0 0 5px 1px ${(props) => props.border};
  }
`;

const Img = styled.img`
  display: block;
  width: 50px;
  margin: 0 auto;
  align-self: center;
  @media (max-width: 768px) {
    width: 60px;
  }
  @media (max-width: 576px) {
    width: 50px;
  }
`;

const Text = styled.span`
  text-align: center;
  font-size: 0.875rem;
  margin-top: 5px;
`;

const ImageQuickReply = ({
  imageUrl,
  text,
  color,
  border,
  size = "125px",
  onClick,
}) => {
  return (
    <Box size={size} color={color} border={border} onClick={onClick}>
      <Img src={imageUrl} alt="Quick Reply Icon" />
      <Text>{text}</Text>
    </Box>
  );
};

ImageQuickReply.propTypes = {
  imageUrl: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  color: PropTypes.string,
  border: PropTypes.string,
  size: PropTypes.string,
};

ImageQuickReply.defaultProps = {
  color: "#00ee5f",
  border: "#e3f2e9",
};

export default ImageQuickReply;
