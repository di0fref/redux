import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {apiConfig} from "../config/config";
import getHeaders from "../helpers/getHeaders";

const initialState = []


export const setCurrentFolder = createAsyncThunk(
    'folder/setCurrentFolder',
    async (folderId = 0, thunkAPI) => {
        const response = await fetch(apiConfig.url + "/api/folders/" + folderId,{
            headers: getHeaders()
        })
            .then(response => response.json())
        return response;
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
