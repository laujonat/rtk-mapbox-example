import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface IFilterSetting {
  featureType: string;
  include: boolean;
}

export interface IFiltersState {
  [filterCriteria: string]: Record<number, boolean>; // Use Record<number, boolean> for feature IDs
}

const initialState: IFiltersState = {};

const filtersSlice = createSlice({
  name: "filters",
  initialState,
  reducers: {
    setFilterVisibility: (
      state,
      action: PayloadAction<{
        filterCriteria: string;
        featureId: number;
        visible: boolean;
      }>,
    ) => {
      const { filterCriteria, featureId, visible } = action.payload;
      // Create the filter criteria object if it doesn't exist
      if (!state[filterCriteria]) {
        state[filterCriteria] = {};
      }

      // Update the visibility for the specified feature type and featureId
      state[filterCriteria][featureId] = visible;
    },
    toggleAllLayerAnnotations: (state, action: PayloadAction<string>) => {
      const filterCriteria = action.payload;

      // Ensure the filter criteria exists in the state
      if (state[filterCriteria]) {
        // Iterate through the filter criteria and set all items to 'false'
        Object.keys(state[filterCriteria]).forEach((featureId) => {
          state[filterCriteria][featureId] = { visible: false };
        });
      }
    },
    updateFilterTypes: (
      state,
      action: PayloadAction<{
        [filterCriteria: string]: Record<string, { visible: boolean }>;
      }>,
    ) => {
      // Merge the updated filter types into the state
      Object.keys(action.payload).forEach((filterCriteria) => {
        state[filterCriteria] = {
          ...state[filterCriteria],
          ...action.payload[filterCriteria],
        };
      });
    },
  },
});
export default filtersSlice.reducer;
