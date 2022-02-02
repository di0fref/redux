import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'

const initialState = []

export const login = createAsyncThunk(
    'user/login',
    async (data, thunkAPI) => {
        const response = await fetch("http://localhost:8000/api/users/login",{
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                idToken: data.credential.idToken,
                provider: data.credential.providerId,
                credential: data.credential,
                user: data.user
            })
        })
            .then(response => response.json())
        return response;
    }
)

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {

    },
    extraReducers: (builder) => {
        builder.addCase(login.fulfilled, (state, action) => {
            return action.payload
        })
    },
})
// export const {} = treeSlice.actions

export default userSlice.reducer
