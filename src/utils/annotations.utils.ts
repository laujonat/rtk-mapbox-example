import { Feature, FeatureCollection, Position } from "geojson";

import marker1Image from "../assets/annotations/mapbox-marker-icon-20px-blue.png";
import marker2Image from "../assets/annotations/mapbox-marker-icon-20px-gray.png";
import marker3Image from "../assets/annotations/mapbox-marker-icon-20px-green.png";
import marker4Image from "../assets/annotations/mapbox-marker-icon-20px-orange.png";
import marker5Image from "../assets/annotations/mapbox-marker-icon-20px-pink.png";
import marker6Image from "../assets/annotations/mapbox-marker-icon-20px-purple.png";
import marker7Image from "../assets/annotations/mapbox-marker-icon-20px-red.png";
import marker8Image from "../assets/annotations/mapbox-marker-icon-20px-yellow.png";

export const staticAnnotationIcons = {
  marker1: marker1Image,
  marker2: marker2Image,
  marker3: marker3Image,
  marker4: marker4Image,
  marker5: marker5Image,
  marker6: marker6Image,
  marker7: marker7Image,
  marker8: marker8Image,
};

/**
 * Generates a unique ID for a new annotation based on its type and
 * the number of existing annotations of that type.
 *
 * @param markerType - The type of annotation
 * @param placedAnnotations - The array of existing placed annotations
 * @returns A unique ID string for the new annotation
 */
export function generateAnnotationUUID(
  markerType: string,
  placedAnnotations: FeatureCollection,
): number {
  // Count how many existing annotations match the markerType
  const markerTypeCount = placedAnnotations.features.filter(
    (annotation) => annotation?.properties?.type === markerType,
  ).length;

  return markerTypeCount;
}

/**
 * Creates a new annotation feature object with a unique ID.
 *
 * @param selectedAnnotationId - The selected annotation ID.
 * @param coordinates - The coordinates for the new annotation.
 * @param placedAnnotations - The existing placed annotations to calculate a unique ID.
 * @returns A new annotation feature.
 */
export const createNewAnnotationFeature = (
  selectedAnnotationId: string,
  coordinates: Position,
  placedAnnotations: FeatureCollection,
): Feature => {
  const id = generateAnnotationUUID(selectedAnnotationId, placedAnnotations);
  return {
    type: "Feature",
    geometry: {
      type: "Point",
      coordinates: coordinates,
    },
    properties: {
      id: id,
      title: selectedAnnotationId,
      description: "Optional description",
      type: selectedAnnotationId,
    },
  };
};
