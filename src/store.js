import { configureStore } from "@reduxjs/toolkit";

import treeReducer from "./features/treeSlice";
import comparingReducer from "./features/animationSlice";

export default configureStore({
    reducer: {
        comparing: comparingReducer,
        tree: treeReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
        }),
});
