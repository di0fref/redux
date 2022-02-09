import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {apiConfig} from "../config/config";
import http from "../helpers/http-common";

const initialState = []


export const setCurrentFolder = createAsyncThunk(
    'folder/setCurrentFolder',
    async (folderId = 0, thunkAPI) => {
        return await http.get(apiConfig.url + "/folders/" + folderId)
            .then(response => response.data)
    }
)

export const currentFolderSlice = createSlice({
    name: 'currentFolder',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(setCurrentFolder.fulfilled, (state, action) => {
                return action.payload
            })
    }

})
export const {} = currentFolderSlice.actions

export default currentFolderSlice.reducer
