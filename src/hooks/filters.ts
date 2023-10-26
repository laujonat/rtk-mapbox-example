import { Feature } from "geojson";
import { useCallback } from "react";
import { updateAnnotation } from "redux/actions/annotationActions";
import {
  setFilterVisibility,
  toggleAllLayerAnnotations,
} from "redux/actions/filterActions";
import { RootState } from "redux/store";

import { useAnnotations } from "./annotations";
import { useAppDispatch, useAppSelector } from "./store";

export const useFilters = () => {
  return useAppSelector((state: RootState) => state.filters.features);
};

/**
 * Toggle visibility of ALL features within a layer
 *
 * @param {string} filterCriteria - The name of the layer
 * @param {boolean} visible - Whether to set the features visible or not
 *
 * @returns {Object} Methods to toggle visibility
 */
export function useLayerFilterVisibility() {
  const dispatch = useAppDispatch();

  const toggleVisibility = useCallback(
    (filterCriteria: string, visible: boolean) => {
      dispatch(toggleAllLayerAnnotations({ filterCriteria, visible }));
    },
    [dispatch],
  );

  return {
    toggleVisibility,
  };
}

/**
 * Toggles a SINGLE  feature visibility of feature within a layer
 *
 * @param {string} filterCriteria - The name of the layer
 * @param {string} featureId - The feature uuid
 * @param {boolean} visible - Whether to set the features visible or not
 *
 * @returns {Object} Methods to toggle visibility
 */
export default function useFeatureVisibility() {
  const dispatch = useAppDispatch();
  const { features } = useAnnotations();

  const toggleFeatureVisibility = useCallback(
    async (filterCriteria: string, featureId: number, visible: boolean) => {
      dispatch(setFilterVisibility(filterCriteria, featureId, visible));

      const featureToUpdate = features.find(
        (feature: Feature) => feature?.properties?.id === featureId,
      );

      if (featureToUpdate) {
        // Create an updated Feature object by merging the existing feature with updated visibility
        const updatedFeature: Feature = {
          ...featureToUpdate,
          properties: {
            ...featureToUpdate.properties,
            visibility: visible ? "visible" : "none",
          },
        };

        // Dispatch the updateAnnotation action
        dispatch(updateAnnotation(updatedFeature));
      }
    },
    [dispatch, features],
  );

  return {
    toggleFeatureVisibility,
  };
}
