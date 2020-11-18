import React, { useState, Fragment } from "react";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import { Collapse } from "reactstrap";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";

import {
  hideContainer,
  showContainer,
} from "../redux/actions/quickReplyAction";
import InputBar from "../components/ChatInput/InputBar";
import QuickReplyContainer from "../components/ChatInput/QuickReplyContainer";



const Wrapper = styled.div`
  width: 100%;
  padding: 1rem 0;
  background-color: #d9d9d9;
  border-radius: 0 0 10px 10px;
`;

const Container = styled(Collapse)`
  width: 100%;
  scroll-snap-type: x mandatory;
  overflow-x: auto;
  margin-bottom: 1rem;
  display: flex;
  justify-content: center;
  &:after {
    content: "";
    padding-right: 1rem;
  }
  & > div {
    scroll-snap-align: center;
  }
  @media (max-width: 992px) {
    width: 992px;
    justify-content: flex-start;
  }
`;

const ToggleButton = styled.span`
  width: 1rem;
  height: 1rem;
  position: absolute;
  top: 1rem;
  right: 1rem;
  cursor: pointer;
`;

const InputContainer = () => {
  // eslint-disable-next-line
  const [inputActive] = useState(false);
  return (
    <Fragment>
        <InputBar />
    </Fragment>
  );
};


const ChatFooter = () => {
  const dispatch = useDispatch();
  const quickReply = useSelector((state) => state.quickReply);

  const toggler = () => {
    if (quickReply.container) {
      dispatch(hideContainer());
    } else {
      dispatch(showContainer());
    }
  };
  
  

  return (
    <Wrapper>
      {quickReply.display ? (
        <Fragment>
          <Container isOpen={quickReply.container}>
            <QuickReplyContainer data={quickReply} />
          </Container>
          <ToggleButton onClick={() => toggler()}>
            {quickReply.container ? <FaChevronDown /> : <FaChevronUp />}
          </ToggleButton>
        </Fragment>
      ) : null}
      <InputContainer />
    </Wrapper>
  );
};

export default ChatFooter;