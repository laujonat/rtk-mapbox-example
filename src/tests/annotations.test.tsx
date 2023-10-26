import { Feature } from "geojson";
import annotationsReducer from "reducers/annotationsReducer";
import {
  addAnnotation,
  removeAnnotation,
  selectAnnotation,
  updateAnnotation,
} from "redux/actions/annotationActions";

import { render } from "@testing-library/react";

import Menu from "../components/menu/menu";

test("renders menu component", () => {
  render(<Menu />);
});

describe("annotationsSlice reducer", () => {
  const initialState = {
    annotations: [],
    selectedAnnotationId: null,
    filterCriteria: null,
    annotationTypeToFeatures: {},
    placedAnnotations: {
      type: "FeatureCollection",
      features: [],
    },
  };

  it("should handle adding an annotation", () => {
    const feature: Feature = {
      type: "Feature",
      properties: {
        id: "1",
        visibility: "visible",
        type: "annotationType",
      },
      geometry: {
        type: "Point",
        coordinates: [0, 0],
      },
    };

    const nextState = annotationsReducer(initialState, addAnnotation(feature));

    expect(nextState.placedAnnotations.features).toContainEqual(feature);
    expect(nextState.filterCriteria).toContain("annotationType");
  });

  it("should handle updating an annotation", () => {
    const initialState = {
      annotations: [],
      selectedAnnotationId: null,
      filterCriteria: ["annotationType"],
      annotationTypeToFeatures: {
        annotationType: [
          {
            type: "Feature",
            properties: {
              id: "1",
              visibility: "visible",
              type: "annotationType",
            },
            geometry: {
              type: "Point",
              coordinates: [0, 0],
            },
          },
        ],
      },
      placedAnnotations: {
        type: "FeatureCollection",
        features: [
          {
            type: "Feature",
            properties: {
              id: "1",
              visibility: "visible",
              type: "annotationType",
            },
            geometry: {
              type: "Point",
              coordinates: [0, 0],
            },
          },
        ],
      },
    };

    const updatedFeature: Feature = {
      type: "Feature",
      properties: {
        id: "1",
        visibility: "none", // Change visibility
        type: "annotationType",
      },
      geometry: {
        type: "Point",
        coordinates: [0, 0],
      },
    };

    const nextState = annotationsReducer(
      initialState,
      updateAnnotation(updatedFeature),
    );

    expect(nextState.placedAnnotations.features[0].properties.visibility).toBe(
      "none",
    );
  });

  it("should handle removing an annotation", () => {
    const initialState = {
      annotations: [],
      selectedAnnotationId: null,
      filterCriteria: null,
      annotationTypeToFeatures: {},
      placedAnnotations: {
        type: "FeatureCollection",
        features: [
          {
            type: "Feature",
            properties: {
              id: "1",
              visibility: "visible",
              type: "annotationType",
            },
            geometry: {
              type: "Point",
              coordinates: [0, 0],
            },
          },
        ],
      },
    };

    const nextState = annotationsReducer(initialState, removeAnnotation("1"));

    expect(nextState.placedAnnotations.features).toHaveLength(0);
  });

  it("should handle selecting an annotation", () => {
    const nextState = annotationsReducer(
      initialState,
      selectAnnotation("selectedId"),
    );

    expect(nextState.selectedAnnotationId).toBe("selectedId");
  });
});
