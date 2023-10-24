declare module "redux-logger";

interface Annotation {
  id: string; // A unique identifier for the annotation
  coordinates: [number, number]; // Latitude and Longitude of the annotation's location
  title: string; // A title or label for the annotation
  description?: string; // Optional description or additional information
  type: string; // The type or category of the annotation
}

interface IAnnotationState {
  annotations: Annotation[];
  selectedAnnotationId: string | null;
  filterCriteria: string | null;
  placedAnnotations: FeatureCollection;
}
