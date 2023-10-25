import { Feature } from "geojson";

// Action type definitions

export const AnnotationActionTypes = {
  ADD_ANNOTATION: "annotations/addAnnotation",
  UPDATE_ANNOTATION: "annotations/updateAnnotation",
  SELECT_ANNOTATION: "annotations/selectAnnotation",
  REMOVE_ANNOTATION: "annotations/removeAnnotation",
  SET_FEATURE_COUNTS: "annotations/setFeatureCounts",
};

// Define action interfaces for feature counts
interface SetFeatureCountsAction {
  type: typeof AnnotationActionTypes.SET_FEATURE_COUNTS;
  payload: Record<string, number>;
}
// Define action interfaces
interface AddAnnotationAction {
  type: typeof AnnotationActionTypes.ADD_ANNOTATION;
  payload: Feature;
}

interface UpdateAnnotationAction {
  type: typeof AnnotationActionTypes.UPDATE_ANNOTATION;
  payload: Feature;
}

interface SelectAnnotationAction {
  type: typeof AnnotationActionTypes.SELECT_ANNOTATION;
  payload: string; // Annotation ID
}

interface RemoveAnnotationAction {
  type: typeof AnnotationActionTypes.REMOVE_ANNOTATION;
  payload: string; // Annotation ID
}

// Action creators
export const addAnnotation = (feature: Feature): AddAnnotationAction => ({
  type: AnnotationActionTypes.ADD_ANNOTATION,
  payload: feature,
});

export const updateAnnotation = (feature: Feature): UpdateAnnotationAction => ({
  type: AnnotationActionTypes.UPDATE_ANNOTATION,
  payload: feature,
});

export const selectAnnotation = (
  annotationId: string,
): SelectAnnotationAction => ({
  type: AnnotationActionTypes.SELECT_ANNOTATION,
  payload: annotationId,
});

export const removeAnnotation = (
  annotationId: string,
): RemoveAnnotationAction => ({
  type: AnnotationActionTypes.REMOVE_ANNOTATION,
  payload: annotationId,
});

// Action creator for setting feature counts
export const setFeatureCounts = (
  counts: Record<string, number>,
): SetFeatureCountsAction => ({
  type: AnnotationActionTypes.SET_FEATURE_COUNTS,
  payload: counts,
});

// // Define and export the async thunk
// export const fetchFeatureCounts = createAsyncThunk(
//   "annotations/fetchFeatureCounts",
//   async (_, { getState, dispatch }) => {
//     const state = getState() as RootState;
//     const { annotationTypeToFeatures } = state.annotations;

//     // Calculate feature counts by annotation type
//     const featureCounts: Record<string, number> = {};

//     for (const type in annotationTypeToFeatures) {
//       if (annotationTypeToFeatures.hasOwnProperty(type)) {
//         // Ensure the property exists
//         featureCounts[type] = annotationTypeToFeatures[type].length;
//       }
//     }

//     // Dispatch an action with the feature counts
//     dispatch(setFeatureCounts(featureCounts));
//   },
// );
