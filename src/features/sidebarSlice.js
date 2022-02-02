import {createSlice} from "@reduxjs/toolkit";
const initialState = []

export const sidebarSlice = createSlice({
    name: 'sidebar',
    initialState,
    reducers: {
        setOpen: (state, action) => {
            return action.payload
        },
    },

})
export const {setOpen} = sidebarSlice.actions

export default sidebarSlice.reducer
