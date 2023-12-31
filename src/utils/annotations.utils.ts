import { Feature, FeatureCollection, Position } from "geojson";

import marker1Image from "../assets/annotations/mapbox-marker-icon-20px-blue.png";
import marker2Image from "../assets/annotations/mapbox-marker-icon-20px-gray.png";
import marker3Image from "../assets/annotations/mapbox-marker-icon-20px-green.png";
import marker4Image from "../assets/annotations/mapbox-marker-icon-20px-orange.png";
import marker5Image from "../assets/annotations/mapbox-marker-icon-20px-pink.png";
import marker6Image from "../assets/annotations/mapbox-marker-icon-20px-purple.png";
import marker7Image from "../assets/annotations/mapbox-marker-icon-20px-red.png";
import marker8Image from "../assets/annotations/mapbox-marker-icon-20px-yellow.png";

interface AnnotationImage {
  [key: string]: string;
}
export const staticAnnotationIcons: AnnotationImage = {
  alpha: marker1Image,
  beta: marker2Image,
  gamma: marker3Image,
  delta: marker4Image,
  epsilon: marker5Image,
  zeta: marker6Image,
  eta: marker7Image,
  theta: marker8Image,
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
      visibility: "visible", // individual annotation visibility (visible || none)
      title: selectedAnnotationId,
      description: "Optional description",
      type: selectedAnnotationId,
    },
  };
};

/**
 * Converts an HTMLImageElement to a Base64-encoded Data URL.
 *
 * @param image - The HTMLImageElement to convert.
 * @returns A Promise that resolves to the Base64 Data URL of the image.
 */
export const getBase64FromImage = async (
  image: HTMLImageElement,
): Promise<string> => {
  const canvas: HTMLCanvasElement = document.createElement("canvas");
  const ctx: CanvasRenderingContext2D | null = canvas.getContext("2d");

  if (!ctx) {
    throw new Error("Canvas 2D context is not supported");
  }

  canvas.width = image.width;
  canvas.height = image.height;

  ctx.drawImage(image, 0, 0);

  const dataURL: string = canvas.toDataURL("image/png");

  return dataURL;
};

export function getIconImagePath(annotationType: string): string {
  return staticAnnotationIcons[annotationType];
}
