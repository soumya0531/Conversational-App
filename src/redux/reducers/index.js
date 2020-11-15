import { combineReducers } from "redux";

import messageReducer from "./messageReducer";
import quickReplyReducer from "./quickReplyReducer";

const rootReducer = combineReducers({
  message: messageReducer,
  quickReply: quickReplyReducer,
});

export default rootReducer;
