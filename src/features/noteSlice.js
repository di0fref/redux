import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import {apiConfig} from "../config/config";
import http from "../helpers/http-common";

const initialState = []

export const fetchAllNotes = createAsyncThunk(
    'notes/fetchAllNotes',
    async (folderId = 0, thunkAPI) => {
        return await http.get(apiConfig.url + "/notes").then(response => response.data)
    }
)

export const addNote = createAsyncThunk(
    'notes/addNote',
    async (folderId = 0, thunkAPI) => {
        return await http.post(apiConfig.url + "/notes", {
            folder_id: folderId
        }).then(response => response.data)
    }
)

export const updateNoteBody = createAsyncThunk(
    'notes/updateNoteBody',
    async (note, thunkAPI) => {
        return await http.put(apiConfig.url + "/notes/" + note.id, {
            text: note.text,
        }).then(response => response.data)
    }
)

export const updateNoteTitle = createAsyncThunk(
    'notes/updateNoteTitle',
    async (note, thunkAPI) => {
        return await http.put(apiConfig.url + "/notes/" + note.id, {
            name: note.name,
        }).then(response => response.data)
    }
)

export const updateBookMark = createAsyncThunk(
    'notes/updateBookMark',
    async (note, thunkAPI) => {
        return await http.put(apiConfig.url + "/notes/" + note.id, {
            bookmark: note.bookmark
        }).then(response => response.data)
    }
)

export const updateLock = createAsyncThunk(
    'notes/updateLock',
    async (note, thunkAPI) => {
        return await http.put(apiConfig.url + "/notes/" + note.id, {
            locked: note.locked
        }).then(response => response.data)
    }
)

export const deleteNote = createAsyncThunk(
    'notes/deleteNote',
    async (noteId, thunkAPI) => {
        return await http.put(apiConfig.url + "/notes/" + noteId, {
            deleted: 1
        }).then(response => response.data)
    }
)

export const noteSlice = createSlice({
    name: 'notes',
    initialState,
    reducers: {
        sortNotes(state) {
            state.sort(function (a, b) {
                console.log(a)
                return new Date(b.updated_at) - new Date(a.updated_at);
            });
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchAllNotes.fulfilled, (state, action) => {
                return action.payload
            })
            .addCase(addNote.fulfilled, (state, action) => {
                state.unshift(action.payload)
            })
            .addCase(updateNoteBody.fulfilled, (state, action) => {
                const {id, text, updated_at} = action.payload
                const existingNote = state.find(note => note.id === id)
                existingNote.text = JSON.stringify(text);
                existingNote.updated_at = updated_at;
            })
            .addCase(updateNoteTitle.fulfilled, (state, action) => {
                const {id, name, updated_at} = action.payload
                const existingNote = state.find(note => note.id === id)
                existingNote.name = name;
                existingNote.updated_at = updated_at;

                console.log(JSON.parse(JSON.stringify(existingNote)));

            })
            .addCase(updateBookMark.fulfilled, (state, action) => {
                const {id, bookmark, updated_at} = action.payload
                const existingNote = state.find(note => note.id === id)
                existingNote.bookmark = bookmark;
                existingNote.updated_at = updated_at;
            })
            .addCase(updateLock.fulfilled, (state, action) => {
                const {id, locked, updated_at} = action.payload
                const existingNote = state.find(note => note.id === id)
                existingNote.locked = locked;
                existingNote.updated_at = updated_at;
            })
            .addCase(deleteNote.fulfilled, (state, action) => {
                const {id, deleted, updated_at} = action.payload
                const existingNote = state.find(note => note.id === id)
                existingNote.deleted = deleted;
                existingNote.updated_at = updated_at;
            })
    },
})
export const {sortNotes} = noteSlice.actions

export default noteSlice.reducer
