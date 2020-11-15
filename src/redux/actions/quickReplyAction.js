import {
  SHOW_QUICK_REPLY_CONTAINER,
  HIDE_QUICK_REPLY_CONTAINER,
  OPEN_CONTAINER,
  CLOSE_CONTAINER,
} from "./types";

const showQuickReply = (payloadType, data) => {
  return {
    type: SHOW_QUICK_REPLY_CONTAINER,
    payloadType,
    payload: data,
  };
};

const hideQuickReply = () => {
  return {
    type: HIDE_QUICK_REPLY_CONTAINER,
  };
};

const showContainer = () => {
  return {
    type: OPEN_CONTAINER,
  };
};

const hideContainer = () => {
  return {
    type: CLOSE_CONTAINER,
  };
};

export { showQuickReply, hideQuickReply, showContainer, hideContainer };
