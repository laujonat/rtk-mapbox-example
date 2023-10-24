import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface IFilterSetting {
  featureType: string;
  include: boolean;
}

export interface IFiltersState {
  filterSettings: IFilterSetting[];
}

const initialState: IFiltersState = {
  filterSettings: [],
};

const filtersSlice = createSlice({
  name: "filters",
  initialState,
  reducers: {
    setFilterSettings: (state, action: PayloadAction<IFiltersState>) => {
      // Update the entire filters state
      return action.payload;
    },
  },
});

export default filtersSlice.reducer;
