// Action type definitions
export const ADD_ANNOTATION = "ADD_ANNOTATION";
export const UPDATE_ANNOTATION = "UPDATE_ANNOTATION";
export const SELECT_ANNOTATION = "SELECT_ANNOTATION";
export const REMOVE_ANNOTATION = "REMOVE_ANNOTATION";

// Define action interfaces
interface AddAnnotationAction {
  type: typeof ADD_ANNOTATION;
  payload: Annotation;
}

interface UpdateAnnotationAction {
  type: typeof UPDATE_ANNOTATION;
  payload: Annotation;
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
export const addAnnotation = (annotation: Annotation): AddAnnotationAction => ({
  type: ADD_ANNOTATION,
  payload: annotation,
});

export const updateAnnotation = (
  annotation: Annotation,
): UpdateAnnotationAction => ({
  type: UPDATE_ANNOTATION,
  payload: annotation,
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
