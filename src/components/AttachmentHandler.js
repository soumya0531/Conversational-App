import React, { memo } from "react";
import PropTypes from "prop-types";
import { useDispatch } from "react-redux";

import HeroImage from "./QuickReplyItem/HeroImage";
import Table from "./Table/Table";

import {
  showQuickReply,
  hideQuickReply,
} from "../redux/actions/quickReplyAction";

import {
  QUICK_REPLY_ACTION,
  QUICK_REPLY_IMAGE,
  QUICK_REPLY_TEXT,
  HERO_CARD,
  CAROUSEL,
  TABLE,
} from "../api/const";

const AttachmentHandler = ({ attachments }) => {
  const dispatch = useDispatch();
  return attachments.map((attachment) => {
    switch (attachment.type) {
      case QUICK_REPLY_IMAGE:
        dispatch(showQuickReply(attachment.type, attachment.value));
        return null;
      case QUICK_REPLY_TEXT:
        dispatch(showQuickReply(attachment.type, attachment.value));
        return null;
      case QUICK_REPLY_ACTION:
        dispatch(showQuickReply(attachment.type, attachment.value));
        return null;
      case HERO_CARD:
      case CAROUSEL: {
        dispatch(hideQuickReply());
        return attachment.value.map((value, i) => (
          <HeroImage key={i} {...value} />
        ));
      }
      case TABLE:
        dispatch(hideQuickReply());
        return <Table data={attachment.value[0]} />;
      default:
        return null;
    }
  });
};

AttachmentHandler.propTypes = {
  attachments: PropTypes.array.isRequired,
};

export default memo(AttachmentHandler);
