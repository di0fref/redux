import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import http from "../helpers/http-common";
import {apiConfig} from "../config/config";


const initialState = [
    {
        text: "Tailwind CSS to do list with system date and time and strike option snippet for your project . this snippet is created using HTML, CSS, Tailwind CSS,",
        done: 1,
        deadline: "",
        id: 1
    },
    {
        text: "Grab milk",
        done: 1,
        deadline: "",
        id: 2
    }, {
        text: "Milk a cow",
        done: 1,
        deadline: "",
        id: 3
    }
    ,
    {
        text: "Tailwind CSS to do list with system date and time and strike option snippet for your project . this snippet is created using HTML, CSS, Tailwind CSS,",
        done: 0,
        deadline: "",
        id: 4
    },
    {
        text: "Grab milk",
        done: 0,
        deadline: "",
        id: 5
    },
    {
        text: "Milk a cow",
        done: 0,
        deadline: "",
        id: 6
    }
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
        toggleTodoDone(state, action){
            console.log(action.payload)
            const todo = state.find(todo => todo.id === action.payload)

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
