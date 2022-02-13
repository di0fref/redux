import { configureStore } from '@reduxjs/toolkit'
import NotesReducer from "../features/noteSlice"
import currentFolderReducer from "../features/currentFolderSlice"
import currentNotesReducer from "../features/currentNoteSlice"
import treeReducer from "../features/treeSlice"
import sideReducer from "../features/sideSlice"
import userReducer from "../features/userSlice"
import todoReducer from "../features/todoSlice"

export const store = configureStore({
    reducer: {
        notes: NotesReducer,
        currentNote: currentNotesReducer,
        tree: treeReducer,
        currentFolder: currentFolderReducer,
        side: sideReducer,
        user: userReducer,
        todos: todoReducer,
    }
})
window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
