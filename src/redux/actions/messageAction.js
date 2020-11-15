import API from "../../api";

import { USER_MESSAGE, BOT_MESSAGE, CLEAR_MESSAGE } from "./types";

const sendMessage = (message) => {
  return (dispatch) => {
    const request = {
      requestId: "123as45",
      sessionId: "bf3cc9a2f5de",
      type: "message",
      event: "false",
      userMessage: message,
      attachment: "",
    };
    dispatch({
      type: USER_MESSAGE,
      payload: request,
    });
    return API.post("/messages", request)
      .then((res) => {
        if (res.status === 200) {
          dispatch({
            type: BOT_MESSAGE,
            payload: res.data,
          });
        }
      })
      .catch((err) => console.log("API error: ", err));
  };
};

const clearMessage = () => {
  return (dispatch) => {
    dispatch({
      type: CLEAR_MESSAGE,
    });
  };
};

const sendFirstMessage = () => {
  return (dispatch) => {
    return API.post("/messages", { userMessage: "firstmessage" })
      .then((res) => {
        if (res.status === 200)
          dispatch({ type: BOT_MESSAGE, payload: res.data });
      })
      .catch((err) => console.log("API error: ", err));
  };
};

export { sendMessage, clearMessage, sendFirstMessage };
