import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./reducers";
import logger from "redux-logger";
import { IFiltersState } from "reducers/filtersReducer";
import { IAnnotationState } from "reducers/annotationsReducer";

export interface IAppState {
  filter: IFiltersState;
  annotations: IAnnotationState;
}

const middleware: (typeof logger)[] = [];

if (process.env.NODE_ENV === "development") {
  middleware.push(logger);
}

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(...middleware),
  devTools: process.env.NODE_ENV === "development",
});

export default store;

export type RootState = ReturnType<typeof rootReducer>;
