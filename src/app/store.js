import { configureStore } from '@reduxjs/toolkit'
import NotesReducer from "../features/noteSlice"
import currentFolderReducer from "../features/currentFolderSlice"
import currentNotesReducer from "../features/currentNoteSlice"
import treeReducer from "../features/treeSlice"
import sidebarReducer from "../features/sidebarSlice"
import userReducer from "../features/userSlice"

export const store = configureStore({
    reducer: {
        notes: NotesReducer,
        currentNote: currentNotesReducer,
        tree: treeReducer,
        currentFolder: currentFolderReducer,
        sidebar: sidebarReducer,
        user: userReducer
    }
})
window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
