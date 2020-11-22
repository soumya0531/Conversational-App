import API from "../../api";
import firebase from 'firebase/app';

import { USER_MESSAGE, BOT_MESSAGE, CLEAR_MESSAGE } from "./types";

const sendMessage = (message) => {
  return (dispatch) => {
    const request = {
      sender: firebase.auth().currentUser.uid,
      message,
      messageBy: "USER"
    };
    dispatch({
      type: USER_MESSAGE,
      payload: request,
    });
    return API.post("webhooks/rest/webhook", request)
      .then((res) => {
        if (res.status === 200) {
          dispatch({
            type: BOT_MESSAGE,
            payload: {...res.data[0], messageBy:"BOT"}
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
    dispatch({
      type: BOT_MESSAGE,
      payload:{text:"Hey! I am your virtual customer services agent. How may I help you today?", messageBy:"BOT"}
    })
  };
};

export { sendMessage, clearMessage, sendFirstMessage };
