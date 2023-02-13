import { configureStore } from "@reduxjs/toolkit";
import booksReducer from "./booksslice";
import userReducer from "./userslice";

const store = configureStore({
    reducer: {
        user: userReducer,
        books: booksReducer
    },
});

export default store;