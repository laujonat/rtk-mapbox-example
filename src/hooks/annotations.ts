import { useAppSelector } from "./store";

export const useAnnotations = () => {
  return useAppSelector((state) => state.annotations.placedAnnotations);
};

export const useAnnotationTypeId = () => {
  return useAppSelector((state) => state.annotations.selectedAnnotationId);
};
