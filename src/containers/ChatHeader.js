import React, { useState } from "react";
import styled from "styled-components";
import { Collapse, Nav, Navbar, NavItem } from "reactstrap";
import { IconContext } from "react-icons";
import {
  FaSignOutAlt,
  FaChevronDown,
  FaChevronUp,
  FaHome,
} from "react-icons/fa";

import NavButton from "../components/NavButton";
import logo from "../images/logo.gif";
import firebase from 'firebase';

const StyledNavbar = styled(Navbar)`
  position: fixed;
  top: 0;
  width: 100%;
  background-color: #3F3250;
  z-index: 999;
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
  margin-top: 10px;
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
  
  return (
    <StyledNavbar expand="md" className="px-4 px-md-3 py-1">
      <LogoContainer>
        <LogoImage
          src= {logo}
          alt="Company Logo"
        />
        <LogoText className="text-white">DELL SOLUTIONS</LogoText>
      </LogoContainer>
      <Toggler onClick={toggle} type="button" aria-label="Toggle navigation">
        <IconContext.Provider value={{ size: "24px", color: "#fff" }}>
          {isOpen ? <FaChevronUp /> : <FaChevronDown />}
        </IconContext.Provider>
      </Toggler>
      <Collapse isOpen={isOpen} navbar>
        <Nav className="ml-auto" navbar>
          <NavItem className="mx-2 ml-auto">
            <NavButton
              text="Sign Out"
              icon={<FaSignOutAlt />}
              color="#A1373F"
              size="0.875rem"
              onClick={() => firebase.auth().signOut()}
            ></NavButton>
          </NavItem>
        </Nav>
      </Collapse>
    </StyledNavbar>
  );
};

export default ChatHeader;
