import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";

import rootReducer from "./reducers";

const composeEnhancer = composeWithDevTools({
  trace: process.env.NODE_ENV === "production" ? false : true,
  traceLimit: 25,
});

const store = createStore(rootReducer, composeEnhancer(applyMiddleware(thunk)));

export default store;
