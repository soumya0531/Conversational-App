import React, { useState } from "react";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import { Collapse, Nav, Navbar, NavItem } from "reactstrap";
import { IconContext } from "react-icons";
import {
  FaSignOutAlt,
  FaChevronDown,
  FaChevronUp
} from "react-icons/fa";
import { clearMessage } from "../redux/actions/messageAction";



import NavButton from "../components/NavButton";
import logo from "../images/logo.png";
import firebase from 'firebase/app';

const StyledNavbar = styled(Navbar)`
  width: 100%;
  background-color: #3F3250;
  border-radius: 10px 10px 0 0;
  
`;

const LogoContainer = styled.a`
  padding-top: 0.5rem;
  display: flex;
  cursor: pointer;
  &:hover {
    text-decoration: none;
    color: #eee;
  }
`;

const LogoImage = styled.img`
  margin-right: 0.5rem;
  height: 60px;
`;

const LogoText = styled.h3`
  margin-top: 14px;
  font-family: 'Castoro', serif;
  @media (max-width: 768px) {
    font-size:28px;
  }
`;

const Toggler = styled.button`
  background-color: transparent;
  border: none;
  padding: 0.5rem;
  border-radius: 5px;
  &:focus {
    outline: none;
  }
  @media (min-width: 768px) {
    display: none;
  }
`;


const ChatHeader = () => {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);
  const dispatch = useDispatch();
  const handleReset = () => {
    dispatch(clearMessage());
    firebase.auth().signOut();
  };
  
  return (
    <StyledNavbar expand="md" className="px-4 px-md-3 py-1">
      <LogoContainer>
        <LogoImage
          src= {logo}
          alt="Company Logo"
        />
        <LogoText className="text-white">SOLUTIONS</LogoText>
      </LogoContainer>
      <Toggler onClick={toggle} type="button" aria-label="Toggle navigation">
        <IconContext.Provider value={{ size: "24px", color: "#fff" }}>
          {isOpen ? <FaChevronUp /> : <FaChevronDown />}
        </IconContext.Provider>
      </Toggler>
      <Collapse isOpen={isOpen} navbar>
        <Nav className="ml-auto" navbar>
          <NavItem className="mx-auto">
            <NavButton
              text="Sign Out"
              icon={<FaSignOutAlt />}
              color="#3d0c02"
              size="0.875rem"
              onClick={() => {handleReset()}}
            ></NavButton>
          </NavItem>
        </Nav>
      </Collapse>
    </StyledNavbar>
  );
};

export default ChatHeader;
