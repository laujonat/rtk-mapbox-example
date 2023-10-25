import { Feature } from "geojson";

import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: IAnnotationState = {
  annotations: [], // unused
  selectedAnnotationId: null,
  filterCriteria: null,
  annotationTypeToFeatures: {}, // Initialize as an empty object
  placedAnnotations: {
    type: "FeatureCollection",
    features: [],
  },
};

const annotationsSlice = createSlice({
  name: "annotations",
  initialState,
  reducers: {
    addAnnotation: (state, action: PayloadAction<Feature>) => {
      const newFeatures = [...state.placedAnnotations.features, action.payload];

      // Create an object to temporarily store features by annotation type
      const featuresByType: Record<string, Feature[]> = {};

      // Iterate through the new features and organize them by type
      newFeatures.forEach((feature) => {
        const type = feature.properties.type;
        if (!featuresByType[type]) {
          featuresByType[type] = [];
        }
        featuresByType[type].push(feature);
      });

      // Update the annotationTypeToFeatures mapping with the organized features
      state.annotationTypeToFeatures = { ...featuresByType };

      // Update the filterCriteria
      state.filterCriteria = Object.keys(featuresByType);

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
    setFilterCriteria: (state, action: PayloadAction<string[] | null>) => {
      state.filterCriteria = action.payload;
    },
  },
});

export default annotationsSlice.reducer;
