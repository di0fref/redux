import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import {apiConfig} from "../config/config";

const initialState = []

export const fetchTree = createAsyncThunk(
    'tree/fetchTree',
    async (folderId, thunkAPI) => {
        const response = await fetch(apiConfig.url + "/api/tree")
            .then(response => response.json())
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
    },
})
// export const {} = treeSlice.actions

export default treeSlice.reducer
