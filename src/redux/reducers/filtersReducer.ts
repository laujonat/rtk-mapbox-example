import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface LayerVisibilityState {
  [layerId: string]: boolean;
}
export interface FeaturesVisibilityState {
  [layerId: string]: boolean;
}
export interface IFilterVisibilityState {
  [filter: string]: {
    [id: number]: {
      visible: boolean;
    };
  };
}

export interface IFiltersState {
  // Use Record<number, boolean> for feature IDs
  features: IFilterVisibilityState;
  layerVisibility: LayerVisibilityState;
}

const initialState: IFiltersState = { features: {}, layerVisibility: {} };

const filtersSlice = createSlice({
  name: "filters",
  initialState,
  reducers: {
    setFilterVisibility(
      state,
      action: PayloadAction<{
        filterCriteria: string;
        featureId: number;
        visible: boolean;
      }>,
    ) {
      const { filterCriteria, featureId, visible } = action.payload;
      console.log(featureId, visible);
      return {
        ...state,
        features: {
          ...state.features,
          [filterCriteria]: {
            ...state.features[filterCriteria],
            [featureId]: {
              visible,
            },
          },
        },
      };
    },
    toggleAllLayerAnnotations: (
      state,
      action: PayloadAction<{
        filterCriteria: string;
        visible: boolean;
      }>,
    ) => {
      const { filterCriteria, visible } = action.payload;
      const newState = { ...state };
      newState.layerVisibility[filterCriteria] = visible;
      if (state.features[filterCriteria]) {
        Object.keys(newState.features[filterCriteria]).forEach((featureId) => {
          newState.features[filterCriteria] = {
            ...newState.features[filterCriteria], // Preserve existing filters
            [`${featureId}`]: { visible }, // Update the specific feature
          };
        });
        Object.assign(state, newState);
      }
    },
    updateFilterTypes: (
      state,
      action: PayloadAction<IFilterVisibilityState>,
    ) => {
      console.log(action.payload);
      Object.keys(action.payload).forEach((filterCriteria) => {
        if (!state.layerVisibility.hasOwnProperty(filterCriteria)) {
          state.layerVisibility[filterCriteria] = true; // Create and set to true
        }
        state.features[filterCriteria] = {
          ...state.features[filterCriteria],
          ...action.payload[filterCriteria],
        };
      });
    },
  },
});
export default filtersSlice.reducer;
