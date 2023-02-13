import { createSlice } from "@reduxjs/toolkit";
import jwt_decode from "jwt-decode";
import AsyncStorage from '@react-native-async-storage/async-storage';

const initialStateValue = {
    _id: 0,
    username: "",
    nisn: "",
    role: "",
    exp: 0,
    iat: 0,
};

const decodeInitial = () => {
    try {
        const da = jwt_decode(AsyncStorage.getItem('xtoken'));
        return { isAuth: da ? true : false, value: da };
    } catch (err) {
        // console.log("Terjadi Kesalahan Decode");
        return { isAuth: false, value: initialStateValue };
    }
};

const userSlice = createSlice({
    name: "user",
    initialState: decodeInitial(),
    reducers: {
        login: (state, action) => {
            AsyncStorage.clear()
            try {
                // const dataToken = await AsyncStorage.getItem('AccessToken');
                const da = jwt_decode(action.payload);
                state.isAuth = true;
                state.value = da;
                // localStorage.setItem("xtoken", action.payload);
                AsyncStorage.setItem('xtoken', action.payload);
            } catch (err) {
                // console.log("Terjadi Kesalahan Decode");
                return false;
            }
        },
        logout: (state) => {
            state.isAuth = false;
            state.value = initialStateValue;
            // localStorage.clear();
            AsyncStorage.clear()
        },
        sett: (state, action) => {
            state.isAuth = true;
            state.value = action.payload;
        },
    },
});

export const { login, logout, sett } = userSlice.actions;

export default userSlice.reducer;