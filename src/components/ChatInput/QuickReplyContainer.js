import React from "react";
import PropTypes from "prop-types";
import { useDispatch } from "react-redux";

import { sendMessage } from "../../redux/actions/messageAction";

import ImageQuickReply from "../QuickReplyItem/ImageQuickReply";
import TextQuickReply from "../QuickReplyItem/TextQuickReply";
import UploadFile from "../QuickReplyItem/UploadFile";

import {
  QUICK_REPLY_ACTION,
  QUICK_REPLY_IMAGE,
  QUICK_REPLY_TEXT,
  QUICK_REPLY_ACTION_UPLOAD,
  QUICK_REPLY_ACTION_URL,
  QUICK_REPLY_ACTION_OPENAPP,
} from "../../api/const";

const QuickReplyContainer = ({ data }) => {
  const dispatch = useDispatch();
  switch (data.type) {
    case QUICK_REPLY_TEXT:
      return data.value.map((item, i) => (
        <TextQuickReply
          key={i}
          text={item.data}
          onClick={() => dispatch(sendMessage(item.messageToBot))}
        />
      ));
    case QUICK_REPLY_IMAGE:
      return data.value.map((item, i) => (
        <ImageQuickReply
          key={i}
          text={item.data}
          imageUrl={item.source}
          onClick={() => dispatch(sendMessage(item.messageToBot))}
        />
      ));
    case QUICK_REPLY_ACTION:
      return data.value.map((item, i) => {
        switch (item.action) {
          case QUICK_REPLY_ACTION_URL:
          case QUICK_REPLY_ACTION_OPENAPP:
            return null;
          case QUICK_REPLY_ACTION_UPLOAD:
            return <UploadFile key={i} img={item.source} />;
          default:
            return null;
        }
      });
    default:
      return null;
  }
};

QuickReplyContainer.propTypes = {
  data: PropTypes.object,
};

QuickReplyContainer.defaultProps = {
  data: {},
};

export default QuickReplyContainer;
