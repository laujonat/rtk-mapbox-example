import { combineReducers } from "redux";
import annotationsReducer from "./annotationsReducer";
import filtersReducer from "./filtersReducer";

const rootReducer = combineReducers({
  annotations: annotationsReducer,
  filters: filtersReducer,
});

export default rootReducer;
