import {createSlice} from "@reduxjs/toolkit";
const initialState = {}

export const currentNoteSlice = createSlice({
    name: 'currentNote',
    initialState,
    reducers: {
        setCurrentNote: (state, action) => {
            return action.payload
        },
    },

})
export const {setCurrentNote} = currentNoteSlice.actions

export default currentNoteSlice.reducer
