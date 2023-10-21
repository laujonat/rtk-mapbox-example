import { createSlice } from '@reduxjs/toolkit';

const initialState = {}

const annotationsSlice = createSlice({
    name: 'annotations',
    initialState,
    reducers: {},
});

export const { actions } = annotationsSlice;
export default annotationsSlice.reducer;