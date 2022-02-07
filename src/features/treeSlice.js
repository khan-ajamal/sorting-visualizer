import { createSlice } from "@reduxjs/toolkit";

export const treeSlice = createSlice({
    name: "tree",
    initialState: {
        steps: [],
    },
    reducers: {
        addStep: (state, action) => {
            state.steps.push(action.payload);
        },
    },
});

// Action creators are generated for each case reducer function
export const { addStep } = treeSlice.actions;

export default treeSlice.reducer;
