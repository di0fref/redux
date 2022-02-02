import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'

const initialState = []

export const fetchAllNotes = createAsyncThunk(
    'notes/fetchAllNotes',
    async (folderId = 0, thunkAPI) => {

        const response = await fetch("http://localhost:8000/api/notes")
            .then(response => response.json())
        return response;
    }
)
export const addNote = createAsyncThunk(
    'notes/addNote',
    async (folderId = 0, thunkAPI) => {
        const response = await fetch("http://localhost:8000/api/notes", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                folder_id: folderId
            })
        }).then(response => response.json())

        return response;
    }
)

export const updateNoteBody = createAsyncThunk(
    'notes/updateNoteBody',
    async (note, thunkAPI) => {
        const response = await fetch("http://localhost:8000/api/notes/" + note.id, {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                text: note.text,
            })
        }).then(response => response.json())
        return response;
    }
)
export const updateNoteTitle = createAsyncThunk(
    'notes/updateNoteTitle',
    async (note, thunkAPI) => {
        const response = await fetch("http://localhost:8000/api/notes/" + note.id, {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: note.name,
            })
        }).then(response => response.json())
        return response;
    }
)

export const updateBookMark = createAsyncThunk(
    'notes/updateBookMark',
    async (note, thunkAPI) => {
        console.log(note)
        const response = await fetch("http://localhost:8000/api/notes/" + note.id, {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                bookmark: note.bookmark
            })
        }).then(response => response.json())
        return response;
    }
)
export const updateLock = createAsyncThunk(
    'notes/updateLock',
    async (note, thunkAPI) => {
        const response = await fetch("http://localhost:8000/api/notes/" + note.id, {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                locked: note.locked
            })
        }).then(response => response.json())
        return response;
    }
)
export const deleteNote = createAsyncThunk(
    'notes/deleteNote',
    async (noteId, thunkAPI) => {
        console.log(noteId)
        const response = await fetch("http://localhost:8000/api/notes/" + noteId, {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                deleted: 1
            })
        }).then(response => response.json())
        return response;
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
                existingNote.text = text;
                existingNote.updated_at = updated_at;
            })
            .addCase(updateNoteTitle.fulfilled, (state, action) => {
                const {id, name, updated_at} = action.payload
                const existingNote = state.find(note => note.id === id)
                existingNote.name = name;
                existingNote.updated_at = updated_at;
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
