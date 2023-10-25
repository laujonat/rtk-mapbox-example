import logger from "redux-logger";
import thunk from "redux-thunk"; // Import Redux Thunk middleware

import { configureStore } from "@reduxjs/toolkit";

import rootReducer from "./reducers";
import { IFiltersState } from "./reducers/filtersReducer";

export interface IAppState {
  filter: IFiltersState;
  annotations: IAnnotationState;
}

const middleware: (typeof logger | typeof thunk)[] = [];

if (process.env.NODE_ENV === "development") {
  middleware.push(logger);
}

middleware.push(thunk); // Apply Redux Thunk middleware

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(...middleware),
  devTools: process.env.NODE_ENV === "development",
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
