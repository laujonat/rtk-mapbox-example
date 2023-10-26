import { IFilterVisibilityState } from "reducers/filtersReducer";

// Action type definitions
export enum VisibilityFilterActionTypes {
  SET_FILTER_SETTINGS = "filters/setFilterSettings",
  SET_FILTER_VISIBILITY = "filters/setFilterVisibility",
  TOGGLE_ALL_LAYER_ANNOTATIONS = "filters/toggleAllLayerAnnotations",
  UPDATE_FILTER_TYPES = "filters/updateFilterTypes",
  UPDATE_FILTER_VISIBILITY = "filters/updateFilterVisibility",
}

export const toggleAllLayerAnnotations = (layerState: {
  filterCriteria: string;
  visible: boolean;
}) => ({
  type: VisibilityFilterActionTypes.TOGGLE_ALL_LAYER_ANNOTATIONS,
  payload: layerState,
});

export const updateFilterTypes = (filterCriteria: IFilterVisibilityState) => ({
  type: VisibilityFilterActionTypes.UPDATE_FILTER_TYPES,
  payload: filterCriteria,
});

// Action creator for setting individual filter visibility
export const setFilterVisibility = (
  filterCriteria: string,
  featureId: number,
  visible: boolean,
) => ({
  type: VisibilityFilterActionTypes.SET_FILTER_VISIBILITY,
  payload: {
    filterCriteria,
    featureId,
    visible,
  },
});
