import {createSlice} from "@reduxjs/toolkit";
const initialState = {
    sidebar: true,
    notelist: true
}

export const sideSlice = createSlice({
    name: 'sidebar',
    initialState,
    reducers: {
        setSidebarOpen: (state, action) => {
            state.sidebar = action.payload
        },
        setNotelistOpen: (state, action) => {
            state.notelist = action.payload
        },
    },

})
export const {setSidebarOpen, setNotelistOpen} = sideSlice.actions

export default sideSlice.reducer
