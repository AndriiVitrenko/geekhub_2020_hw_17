import {configureStore} from "@reduxjs/toolkit";
import todoListSlice from "./todoListSlice";

export const store = configureStore({
    reducer: todoListSlice
})
