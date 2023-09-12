import { configureStore } from "@reduxjs/toolkit";

import userReducer from "Reducers/UserSlice";
import siteReducer from "Reducers/SiteSlice";

export default configureStore({
  reducer: {
    user: userReducer,
    site: siteReducer,
  },
});
