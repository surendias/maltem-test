import { configureStore } from "@reduxjs/toolkit";
import cafeReducer from "./features/cafeSlice";
import employeeReducer from "./features/employeeSlice";

const store = configureStore({
  reducer: {
    cafes: cafeReducer,
    employees: employeeReducer,
  },
});

export default store;
