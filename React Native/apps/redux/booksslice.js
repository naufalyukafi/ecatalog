import { createSlice } from "@reduxjs/toolkit";
import jwt_decode from "jwt-decode";
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from "axios";

const initialStateValue = {
    loanBook: []
};

const booksSlice = createSlice({
    name: "books",
    initialState: initialStateValue,
    reducers: {
        getLoanBook: async (state, action) => {
            console.log('redux ', action)
            state.loanBook = action.payload
        },
    },
});

export const { getLoanBook } = booksSlice.actions;

export default booksSlice.reducer;