import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'

const initialState = {}

export const fetchNotesByFolderId = createAsyncThunk(
    'notes/fetchNotesByFolderId',
    async (folderId = 0, thunkAPI) => {

        const response = await fetch("http://localhost:8000/api/notes/folder/" + folderId)
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
        console.log(response)
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
            .addCase(fetchNotesByFolderId.fulfilled, (state, action) => {
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
                const {id, name} = action.payload
                const existingNote = state.find(note => note.id === id)
                existingNote.name = name;
            })
    },
})
export const {sortNotes} = noteSlice.actions

export default noteSlice.reducer
