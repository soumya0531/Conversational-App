import React, {
  Fragment,
  useRef,
  useEffect,
  useState,
  useCallback,
} from "react";
import { useSelector, useDispatch } from "react-redux";

import BotMessage from "../components/Messages/BotMessage";
import UserMessage from "../components/Messages/UserMessage";
import AttachmentHandler from "../components/AttachmentHandler";

import { sendFirstMessage } from "../redux/actions/messageAction";
import {
  QUICK_REPLY_IMAGE,
  QUICK_REPLY_TEXT,
  QUICK_REPLY_ACTION,
} from "../api/const";

const ChatContainer = () => {
  const dispatch = useDispatch();
  const ref = useRef(null);
  const chatContent = useSelector((state) => state.message);

  // Send first message on component mount.
  useEffect(() => {
    dispatch(sendFirstMessage());
  }, []);

  const scrollToBottom = (direct = false) => {
    // passing direct to this forces scrolling instantly, instead of animating.
    if (ref.current?.scrollIntoView) {
      ref.current.scrollIntoView({ behavior: direct ? "auto" : "smooth" });
    }
  };

  // Calculate margin based on type of Quick Reply
  const { display, container, type } = useSelector((state) => state.quickReply);
  const [marginTop, setMarginTop] = useState("2rem");

  const marginTopCalc = useCallback(() => {
    if (display && container) {
      if (type === QUICK_REPLY_TEXT) setMarginTop("8rem");
      if (type === QUICK_REPLY_IMAGE || type === QUICK_REPLY_ACTION)
        setMarginTop("12rem");
    } else {
      setMarginTop("2rem");
    }
  }, [display, container, type]);

  // Scroll on receiving message
  useEffect(() => {
    marginTopCalc();
    scrollToBottom();
  }, [chatContent, marginTopCalc]);

  return (
    <Fragment>
      {chatContent.map((item, i) => {
        return (
          <Fragment key={i}>
            {item.messageBy === "USER" ? (
              <UserMessage key={i} text={item.userMessage} />
            ) : null}
            {item.messageBy === "BOT" ? (
              <BotMessage key={i} text={item.queryResult} />
            ) : null}
            {item.messageBy === "BOT" && item.attachment[0]?.type ? (
              <AttachmentHandler attachments={item.attachment} />
            ) : null}
          </Fragment>
        );
      })}
      <div
        ref={ref}
        style={{
          marginTop,
        }}
      />
    </Fragment>
  );
};

export default ChatContainer;
