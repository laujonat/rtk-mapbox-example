import { RootState } from "redux/store";

import { useAppSelector } from "./store";

export const useFilters = () => {
  return useAppSelector((state: RootState) => state.filters);
};
