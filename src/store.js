import { configureStore } from "@reduxjs/toolkit";

import treeReducer from "features/treeSlice";
import quickSortReducer from "features/quickSort";
import comparingReducer from "features/animationSlice";

export default configureStore({
    reducer: {
        comparing: comparingReducer,
        tree: treeReducer,
        quickSort: quickSortReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
        }),
});
