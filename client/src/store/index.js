import { createStore, applyMiddleware } from "redux";
import rootReducer from "./reducer.js"
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";

const index = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk))
);

export default index;
