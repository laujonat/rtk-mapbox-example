import { updateAnnotation } from "redux/actions/annotationActions";
import {
  setFilterVisibility,
  VisibilityFilterActionTypes,
} from "redux/actions/filterActions";

import { createAsyncThunk } from "@reduxjs/toolkit";

interface UpdateFilterVisibilityParams {
  filterCriteria: string;
  featureId: number;
  visible: boolean;
  annotationToUpdate?: any;
}

export const updateFeatureFilterVisibility = createAsyncThunk(
  VisibilityFilterActionTypes.UPDATE_FILTER_VISIBILITY,
  async (
    {
      filterCriteria,
      featureId,
      visible,
      annotationToUpdate,
    }: UpdateFilterVisibilityParams,
    { dispatch },
  ) => {
    // Dispatch the initial visibility update action
    dispatch(setFilterVisibility(filterCriteria, featureId, visible));

    if (annotationToUpdate) {
      dispatch(updateAnnotation(annotationToUpdate));
    }
  },
);
