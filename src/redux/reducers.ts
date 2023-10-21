import { combineReducers } from "redux";
import annotationsReducer from "./annotations_reducer";

const rootReducer = combineReducers({
  annotations: annotationsReducer,
});

export default rootReducer;
