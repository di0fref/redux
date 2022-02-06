import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import {apiConfig} from "../config/config";
import getHeaders from "../helpers/getHeaders";

const initialState = []

export const fetchTree = createAsyncThunk(
    'tree/fetchTree',
    async (folderId, thunkAPI) => {
        const response = await fetch(apiConfig.url + "/api/tree",{
            headers: getHeaders()
        })
            .then(response => response.json())
        return response;
    }
)

export const addFolder = createAsyncThunk(
    'tree/addFolder',
    async (data, thunkAPI) => {
        const response = await fetch(apiConfig.url + "/api/folders", {
            method: "POST",
            headers: getHeaders(),
            body: JSON.stringify({
                parent_id: (typeof data.parent_id == "number")?data.parent_id:0,
                name: data.name
            })
        }).then(response => response.json())

        return response;
    }
)

export const treeSlice = createSlice({
    name: 'tree',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchTree.fulfilled, (state, action) => {
            return action.payload
        })
        builder.addCase(addFolder.fulfilled, (state, action) => {
            // No op
        })
    },
})
// export const {} = treeSlice.actions

export default treeSlice.reducer
