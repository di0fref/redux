import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import {apiConfig} from "../config/config";
import http from "../helpers/http-common";

const initialState = []

export const login = createAsyncThunk(
    'user/login',
    async (data, thunkAPI) => {
        return await http.post(apiConfig.url + "/users/login", {
            idToken: data.idToken,
            user: data.user
        }).then(response => response.data)
    }
)

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(login.fulfilled, (state, action) => {
            return action.payload
        })
    },
})
// export const {} = treeSlice.actions

export default userSlice.reducer
