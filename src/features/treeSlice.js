import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import {apiConfig} from "../config/config";
import http from "../helpers/http-common";

const initialState = []

export const fetchTree = createAsyncThunk(
    'tree/fetchTree',
    async (folderId, thunkAPI) => {
        return await http.get(apiConfig.url + "/tree").then(response => response.data)
    }
)

export const addFolder = createAsyncThunk(
    'tree/addFolder',
    async (data, thunkAPI) => {
        return await http.post(apiConfig.url + "/folders", {
                parent_id: (typeof data.parent_id == "string") ? data.parent_id : 0,
                name: data.name
            }).then(response => response.data)
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
