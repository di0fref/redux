import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import http from "../helpers/http-common";
import {apiConfig} from "../config/config";


const initialState = [
    {
        name: "List 1",
        id: 1,
        remaining: 2,
        todos: [
            {
                due: "2022-04-04",
                text: "Tailwind CSS to do list with system date and time and strike option snippet for your project . this snippet is created using HTML, CSS, Tailwind CSS, Tailwind CSS to do list with system date and time and strike option snippet for your project . this snippet is created using HTML, CSS, Tailwind CSS,",
                completed: false,
                id: 1
            },
            {
                due: "2022-05-04",
                text: "Tailwind CSS to do list with system date and time and strike option snippet for your project . this snippet is created using HTML, CSS, Tailwind CSS, Tailwind CSS to do list with system date and time and strike option snippet for your project . this snippet is created using HTML, CSS, Tailwind CSS,",
                completed: false,
                id: 2
            },
        ],

    },
    {
        name: "List number 2",
        id: 2,
        remaining: 1,
        todos: [
            {
                due: "2023-04-04",
                text: "Tailwind CSS to do list with system date and time and strike option snippet for your project . this snippet is created using HTML, CSS, Tailwind CSS, Tailwind CSS to do list with system date and time and strike option snippet for your project . this snippet is created using HTML, CSS, Tailwind CSS,",
                completed: false,
                id: 8
            },
            {
                due: "2024-04-04",
                text: "Grab milk",
                completed: true,
                id: 7
            },
            {
                due: "2023-02-04",
                text: "Milk a cow",
                completed: true,
                id: 12
            },
        ]
    }
]

export const _toggleTodocompleted = createAsyncThunk(
    'todo/setTodocompleted',
    async (todo, thunkAPI) => {
        // return await http.get(apiConfig.url + "/tree").then(response => response.data)
    }
)

export const _addTodo = createAsyncThunk(
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
        toggleTodoCompleted(state, action) {
            const todo = state.filter(lists => lists.todos.find(todo => todo.id == action.payload.todoId))[0].todos.find(todo => todo.id == action.payload.todoId)
            const list = state.find(list => list.id == action.payload.listId);
            todo.completed = !todo.completed;
            list.remaining = list.todos.filter(todo => todo.completed == false).length
        },
        addTodo(state, action){
            const list = state.find(list => list.id == action.payload.listId);
            const allTodos = state.reduce((a, b) => a.todos.concat(b.todos))
            const i = Math.max(...allTodos.map(o => o.id), 0) +1 ;
            list.todos.unshift(
                {
                    text: action.payload.text,
                    due: action.payload.due,
                    id: i
                }
            )
        }
    },
    extraReducers: (builder) => {
        // builder.addCase(toggleTodocompleted.fulfilled, (state, action) => {
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
export const {toggleTodoCompleted, addTodo} = todoSlice.actions

export default todoSlice.reducer
