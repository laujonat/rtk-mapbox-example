import { Feature } from "geojson";

import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: IAnnotationState = {
  annotations: [],
  selectedAnnotationId: null,
  filterCriteria: null,
  placedAnnotations: {
    type: "FeatureCollection",
    features: [], // Initially, no annotations are placed
  },
};

const annotationsSlice = createSlice({
  name: "annotations",
  initialState,
  reducers: {
    addAnnotation: (state, action: PayloadAction<Feature>) => {
      const newFeatures = [...state.placedAnnotations.features, action.payload];
      state.placedAnnotations = {
        ...state.placedAnnotations,
        features: newFeatures,
      };
    },
    updateAnnotation: (state, action: PayloadAction<Annotation>) => {
      const index = state.annotations.findIndex(
        (annotation) => annotation.id === action.payload.id,
      );
      if (index !== -1) {
        state.annotations[index] = action.payload;
      }
    },
    removeAnnotation: (state, action: PayloadAction<string>) => {
      state.annotations = state.annotations.filter(
        (annotation) => annotation.id !== action.payload,
      );
    },
    selectAnnotation: (state, action: PayloadAction<string | null>) => {
      console.log("select payload", action.payload);
      state.selectedAnnotationId = action.payload;
    },
    setFilterCriteria: (state, action: PayloadAction<string | null>) => {
      state.filterCriteria = action.payload;
    },
  },
});

export default annotationsSlice.reducer;
