import { createSlice } from "@reduxjs/toolkit";

export const treeSlice = createSlice({
    name: "tree",
    initialState: {
        progress: [],
    },
    reducers: {
        addProgress: (state, action) => {
            state.progress.push(action.payload);
        },
    },
});

// Action creators are generated for each case reducer function
export const { addProgress } = treeSlice.actions;

export default treeSlice.reducer;
