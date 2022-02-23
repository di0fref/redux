import {createSlice} from "@reduxjs/toolkit";
const initialState = {
    sidebar: true,
    notelist: true,
    docView: "grid"
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
        setDocView: (state, action) => {
            state.docView = action.payload
        }
    },

})
export const {setSidebarOpen, setNotelistOpen, setDocView} = sideSlice.actions

export default sideSlice.reducer
