import { Feature } from "geojson";

// Action type definitions
export const ADD_ANNOTATION = "annotations/addAnnotation";
export const UPDATE_ANNOTATION = "annotations/updateAnnotation";
export const SELECT_ANNOTATION = "annotations/selectAnnotation";
export const REMOVE_ANNOTATION = "annotations/removeAnnotation";

// Define action interfaces
interface AddAnnotationAction {
  type: typeof ADD_ANNOTATION;
  payload: Feature;
}

interface UpdateAnnotationAction {
  type: typeof UPDATE_ANNOTATION;
  payload: Feature;
}

interface SelectAnnotationAction {
  type: typeof SELECT_ANNOTATION;
  payload: string; // Annotation ID
}

interface RemoveAnnotationAction {
  type: typeof REMOVE_ANNOTATION;
  payload: string; // Annotation ID
}

// Action creators
export const addAnnotation = (feature: Feature): AddAnnotationAction => ({
  type: ADD_ANNOTATION,
  payload: feature,
});

export const updateAnnotation = (feature: Feature): UpdateAnnotationAction => ({
  type: UPDATE_ANNOTATION,
  payload: feature,
});

export const selectAnnotation = (
  annotationId: string,
): SelectAnnotationAction => ({
  type: SELECT_ANNOTATION,
  payload: annotationId,
});

export const removeAnnotation = (
  annotationId: string,
): RemoveAnnotationAction => ({
  type: REMOVE_ANNOTATION,
  payload: annotationId,
});
