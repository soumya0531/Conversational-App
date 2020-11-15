import {
  SHOW_QUICK_REPLY_CONTAINER,
  HIDE_QUICK_REPLY_CONTAINER,
  OPEN_CONTAINER,
  CLOSE_CONTAINER,
} from "../actions/types";

const initialState = {};

const quickReplyReducer = (state = initialState, action) => {
  switch (action.type) {
    case SHOW_QUICK_REPLY_CONTAINER:
      return Object.assign({}, state, {
        display: true,
        value: action.payload,
        type: action.payloadType,
        container: true,
      });

    case HIDE_QUICK_REPLY_CONTAINER:
      return Object.assign({}, state, {
        display: false,
        value: undefined,
        type: undefined,
        container: false,
      });

    case OPEN_CONTAINER:
      return Object.assign({}, state, {
        container: true,
      });

    case CLOSE_CONTAINER:
      return Object.assign({}, state, {
        container: false,
      });

    default:
      return state;
  }
};

export default quickReplyReducer;
