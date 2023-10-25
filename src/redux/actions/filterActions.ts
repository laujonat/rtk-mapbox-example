import { IFilterSetting } from "reducers/filtersReducer";

import { PayloadAction } from "@reduxjs/toolkit";

// Define the SetFilterVisibilityPayload type
type SetFilterVisibilityPayload = {
  featureFilterType: string;
  featureId: number;
  visible: boolean;
};

// Action type definitions
export enum VisibilityFilterActionTypes {
  SET_FILTER_SETTINGS = "filters/setFilterSettings",
  SET_ANNOTATION_TYPE_VISIBILITY = "filters/setAnnotationTypeVisibility",
  TOGGLE_ALL_LAYER_ANNOTATIONS = "filters/hideAllLayerAnnotations",
  SET_FILTER_VISIBILITY = "filters/setFilterVisibility",
  UPDATE_FILTER_TYPES = "filters/updateFilterTypes",
}

// Define action interfaces for filters
interface SetFilterSettingsAction extends PayloadAction<IFilterSetting[]> {
  type: VisibilityFilterActionTypes.SET_FILTER_SETTINGS;
}

export interface SetAnnotationTypeVisibilityAction
  extends PayloadAction<{
    type: string;
    isVisible: boolean;
  }> {
  type: VisibilityFilterActionTypes.SET_ANNOTATION_TYPE_VISIBILITY;
}

// Action creator for setting filter visibility
export const setFilterVisibility = (
  featureFilterType: string,
  featureId: number,
  visible: boolean,
): PayloadAction<SetFilterVisibilityPayload> => ({
  type: VisibilityFilterActionTypes.SET_FILTER_VISIBILITY,
  payload: { featureFilterType, featureId, visible },
});

// Action creators for filter criteria
export const setFilterSettings = (
  settings: IFilterSetting[],
): SetFilterSettingsAction => ({
  type: VisibilityFilterActionTypes.SET_FILTER_SETTINGS,
  payload: settings,
});

export const toggleAllLayerAnnotations = (filterCriteria: string) => ({
  type: VisibilityFilterActionTypes.TOGGLE_ALL_LAYER_ANNOTATIONS,
  payload: filterCriteria,
});

export const updateFilterCriteria = (filterCriteria: {
  [x: string]: { [key: string]: { visible: boolean } };
}) => ({
  type: VisibilityFilterActionTypes.UPDATE_FILTER_TYPES,
  payload: filterCriteria,
});
