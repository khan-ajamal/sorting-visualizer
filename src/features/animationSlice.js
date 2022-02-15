import { createSlice } from "@reduxjs/toolkit";

export const comparingSlice = createSlice({
    name: "comparing",
    initialState: {
        comparators: [],
        done: false,
        sortedArraySlice: [],
    },
    reducers: {
        compare: (state, action) => {
            state.comparators.push(action.payload);
        },
        done: (state) => {
            state.done = true;
        },
        resetSlice: (state) => {
            state.comparators = [];
            state.done = false;
            state.sortedArraySlice = [];
        },
    },
});

// Action creators are generated for each case reducer function
export const { compare, done, resetSlice } = comparingSlice.actions;

export default comparingSlice.reducer;
