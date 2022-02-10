import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import http from "../helpers/http-common";
import {apiConfig} from "../config/config";


const initialState = [
    {
        name: "kalle",
        id: 1,
        todos: [
            {
                text: "Tailwind CSS to do list with system date and time and strike option snippet for your project . this snippet is created using HTML, CSS, Tailwind CSS, Tailwind CSS to do list with system date and time and strike option snippet for your project . this snippet is created using HTML, CSS, Tailwind CSS,",
                done: false,
                deadline: "",
                id: 1
            },
        ],
    },
    {
        name: "Ulla",
        id: 2,
        todos: [
            {
                text: "Tailwind CSS to do list with system date and time and strike option snippet for your project . this snippet is created using HTML, CSS, Tailwind CSS, Tailwind CSS to do list with system date and time and strike option snippet for your project . this snippet is created using HTML, CSS, Tailwind CSS,",
                done: false,
                deadline: "",
                id: 1
            },
            {
                text: "Grab milk",
                done: true,
                deadline: "",
                id: 2
            },
            {
                text: "Milk a cow",
                done: true,
                deadline: "",
                id: 3
            },
        ]
    },
]


export const _toggleTodoDone = createAsyncThunk(
    'todo/setTodoDone',
    async (todo, thunkAPI) => {
        // return await http.get(apiConfig.url + "/tree").then(response => response.data)
    }
)

export const addTodo = createAsyncThunk(
    'todo/setPending',
    async (folderId, thunkAPI) => {
        // return await http.get(apiConfig.url + "/tree").then(response => response.data)
    }
)
export const deleteTodo = createAsyncThunk(
    'todo/deleteTodo',
    async (folderId, thunkAPI) => {
        // return await http.get(apiConfig.url + "/tree").then(response => response.data)
    }
)
export const todoSlice = createSlice({
    name: 'todo',
    initialState,
    reducers: {
        toggleTodoDone(state, action) {
            console.log(action.payload)
            const todo = state.filter(list => list.todos.find(todo => todo.id === action.payload))[0].todos[0]

            console.log(todo.done)
            todo.done = !todo.done;

        }
    },
    extraReducers: (builder) => {
        // builder.addCase(toggleTodoDone.fulfilled, (state, action) => {
        //     return action.payload
        // })
        // builder.addCase(addTodo.fulfilled, (state, action) => {
        //     return action.payload
        // })
        // builder.addCase(deleteTodo.fulfilled, (state, action) => {
        //     return action.payload
        // })
    },
})
export const {toggleTodoDone} = todoSlice.actions

export default todoSlice.reducer
