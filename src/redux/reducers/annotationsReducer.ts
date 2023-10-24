import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface IAnnotationState {
  annotations: Annotation[];
  selectedAnnotationId: string | null;
  filterCriteria: string | null;
}
const initialState: IAnnotationState = {
  annotations: [],
  selectedAnnotationId: null,
  filterCriteria: null,
};

const annotationsSlice = createSlice({
  name: "annotations",
  initialState,
  reducers: {
    addAnnotation: (state, action: PayloadAction<Annotation>) => {
      state.annotations.push(action.payload);
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
      state.selectedAnnotationId = action.payload;
    },
    setFilterCriteria: (state, action: PayloadAction<string | null>) => {
      state.filterCriteria = action.payload;
    },
  },
});

export const { actions } = annotationsSlice;
export default annotationsSlice.reducer;
