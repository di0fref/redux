import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import http from "../helpers/http-common";
import {apiConfig} from "../config/config";
import {arrayMoveImmutable} from "array-move";


const initialState = []

export const updateTodo = createAsyncThunk(
    'todo/updateTodo',
    async (todo, thunkAPI) => {
        return await http.put(apiConfig.url + "/tasks/" + todo.id, todo).then(response => response.data)
    }
)

export const _createTodo = createAsyncThunk(
    'todo/createTodo',
    async (todo, thunkAPI) => {
        return await http.post(apiConfig.url + "/tasks", {}).then(response => response.data)
    }
)

export const addTodo = createAsyncThunk(
    'todo/addTodo',
    async (todo, thunkAPI) => {
        console.log(todo)
        return await http.post(apiConfig.url + "/tasks", todo).then(response => response.data)
    }
)
export const deleteTodo = createAsyncThunk(
    'todo/deleteTodo',
    async (id, thunkAPI) => {
        return await http.delete(apiConfig.url + "/tasks/" + id).then(response => response.data)
    }
)

export const getAll = createAsyncThunk(
    'todo/getAll',
    async () => {
        return await http.get(apiConfig.url + "/tasks").then(response => response.data)
    }
)

export const toggleTodoCompleted = createAsyncThunk(
    'todo/toggleTodoCompleted',
    async (todo, thunkAPI) => {
        console.log(todo)
        return await http.put(apiConfig.url + "/tasks/" + todo.id, {
            completed: todo.completed ? 0 : 1
        }).then(response => response.data)
    }
)


export const todoSlice = createSlice({
    name: 'todo',
    initialState,
    reducers: {
        filterTodos(state, action) {
            return state.filter(list => action.payload ? list.remaining === 0 : list.remaining !== 0)
        },
        sort(state, action) {
            const list = state.find(list => list.id == action.payload.id);
        },
        move(state, action) {


            const a = state[action.payload.oldIndex]
            const b = state[action.payload.newIndex]

            http.put(apiConfig.url + "/tasks/" + a.id, {
                order: action.payload.newIndex,
            }).then((result) => {
            })
            http.put(apiConfig.url + "/tasks/" + b.id, {
                order: action.payload.oldIndex,
            }).then((result) => {
            })

            return arrayMoveImmutable(state, action.payload.oldIndex, action.payload.newIndex)

        }
    },
    extraReducers: (builder) => {
        builder.addCase(getAll.fulfilled, (state, action) => {
            return action.payload
        })
        builder.addCase(addTodo.fulfilled, (state, action) => {
            state.unshift(action.payload)
        })

        builder.addCase(toggleTodoCompleted.fulfilled, (state, action) => {
            const todo = Object.values(state).find(todo => todo.id == action.payload.id)
            todo.completed = action.payload.completed
        })
        builder.addCase(updateTodo.fulfilled, (state, action) => {

            const todo = Object.values(state).find(todo => todo.id == action.payload.id)
            todo.name = action.payload.name
            todo.text = action.payload.text
            todo.due = action.payload.due
            todo.prio = action.payload.prio
        })
        builder.addCase(deleteTodo.fulfilled, (state, action) => {
            return Object.values(state).filter(todo => todo.id !== action.meta.arg)
        })

    },
})
export const {filterTodos, move} = todoSlice.actions

export default todoSlice.reducer
