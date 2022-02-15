import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import http from "../helpers/http-common";
import {apiConfig} from "../config/config";
import {arrayMoveImmutable} from "array-move";


const initialState = []

export const updateTodo = createAsyncThunk(
    'todo/updateTodo',
    async (todo, thunkAPI) => {
        return await http.put(apiConfig.url + "/todos", {
            text: todo.text,
        }).then(response => response.data)
    }
)


export const addTodo = createAsyncThunk(
    'todo/addTodo',
    async (todo, thunkAPI) => {
        console.log(todo)
        return await http.post(apiConfig.url + "/tasks", {
            text: todo.text,
            task_list_id: todo.task_list_id,
            due: "2022-05-05"
        }).then(response => response.data)
    }
)
export const deleteTodo = createAsyncThunk(
    'todo/deleteTodo',
    async (folderId, thunkAPI) => {
        // return await http.get(apiConfig.url + "/tree").then(response => response.data)
    }
)

export const getAll = createAsyncThunk(
    'todo/getAll',
    async () => {
        const response = await http.get(apiConfig.url + "/tasks").then(response => response.data)
        response.map((list) => {
            list.remaining = list.todos.filter(todo => todo.completed == false).length
        })
        return response;
    }
)

export const toggleTodoCompleted = createAsyncThunk(
    'todo/toggleTodoCompleted',
    async (todo, thunkAPI) => {
        return await http.put(apiConfig.url + "/tasks/" + todo.id, {
            completed: todo.completed ? 0 : 1
        }).then(response => response.data)
    }
)

export const addTaskList = createAsyncThunk(
    'todo/addTaskList',
    async (list, thunkAPI) => {
        return await http.post(apiConfig.url + "/tasklists/", {
            name: list.name
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
            const list = state.find(list => list.id == action.payload.id);
            list.todos = arrayMoveImmutable(list.todos, action.payload.oldIndex, action.payload.newIndex)
            list.todos.map((todo, index) => {
                todo.order = index
                todo.task_list_id = action.payload.id
            })
            list.todos.map((todo, index) => {
                http.put(apiConfig.url + "/tasks/" + todo.id,{
                    order: index,
                    task_list_id: action.payload.id
                }).then((result) => {

                })
            })
        }
    },
    extraReducers: (builder) => {
        builder.addCase(getAll.fulfilled, (state, action) => {
            return action.payload
        })
        builder.addCase(addTodo.fulfilled, (state, action) => {
            const list = state.find(list => list.id == action.payload.task_list_id);
            list.todos.push(action.payload)
            list.remaining++
        })
        builder.addCase(toggleTodoCompleted.fulfilled, (state, action) => {
            const todo = state.filter(lists => lists.todos.find(todo => todo.id == action.payload.id))[0].todos.find(todo => todo.id == action.payload.id)
            todo.completed = action.payload.completed
            const list = state.find(list => list.id == action.payload.task_list_id);
            console.log(JSON.parse(JSON.stringify(list)))
            list.remaining = list.todos.filter(todo => todo.completed == false).length
        })
        builder.addCase(addTaskList.fulfilled, (state, action) => {
            const list = {
                ...action.payload,
                remaining: 0,
                todos: [],
            }
            state.unshift(list)
        })
    },
})
export const {filterTodos, move} = todoSlice.actions

export default todoSlice.reducer
