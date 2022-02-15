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
        done: (state, action) => {
            state.done = true;
        },
    },
});

// Action creators are generated for each case reducer function
export const { compare, done } = comparingSlice.actions;

export default comparingSlice.reducer;