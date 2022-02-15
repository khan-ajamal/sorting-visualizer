import { createSlice } from "@reduxjs/toolkit";

export const quickSortSlice = createSlice({
    name: "quickSort",
    initialState: {
        progress: [],
    },
    reducers: {
        addProgress: (state, action) => {
            let payload = action.payload;
            state.progress.push(payload);
        },
        resetProgress: (state) => {
            state.progress = [];
        },
    },
});

// Action creators are generated for each case reducer function
export const { addProgress, resetProgress } = quickSortSlice.actions;

export default quickSortSlice.reducer;
