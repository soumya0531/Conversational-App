import { USER_MESSAGE, CLEAR_MESSAGE, BOT_MESSAGE } from "../actions/types";

const initialState = [];

const messageReducer = (state = initialState, action) => {
  switch (action.type) {
    case BOT_MESSAGE:
      return [...state, { ...action.payload, messageBy: "BOT" }];
    case USER_MESSAGE:
      return [...state, { ...action.payload, messageBy: "USER" }];
    case CLEAR_MESSAGE:
      return initialState;
    default:
      return state;
  }
};

export default messageReducer;
