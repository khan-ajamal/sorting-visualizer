import { configureStore } from "@reduxjs/toolkit";

import comparingReducer from "./features/animationSlice";

export default configureStore({
  reducer: {
    comparing: comparingReducer,
  },
});
