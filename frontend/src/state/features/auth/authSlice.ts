import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { AxiosError } from 'axios'
import axios from '../../../api'

export interface SignInValues {
    email: string
    password: string
}

export interface SignUpValues extends SignInValues {
    name: string
    repeat_password: string
}
export interface Auth {
    _id?: string
    name?: string
    email?: string
    accessToken?: any
}
export interface AuthState {
    authUser: Auth
    isSuccess: boolean
    isLoading: boolean
    isError: boolean
    message: string | any
}

export const userData: Auth = JSON.parse(`${localStorage.getItem('token')}`)

export const authSignUp = createAsyncThunk(
    'auth/authSignUp',
    async (user: SignUpValues, thunkAPI) => {
        try {
            const response = await axios.post('users/signup', user)
            if (response.data) {
                localStorage.setItem('token', JSON.stringify(response.data))
            }
            return response.data
        } catch (error) {
            const err = error as AxiosError
            const message =
                (err.response &&
                    err.response.data &&
                    err.response.data.message) ||
                err.message ||
                err.toString()
            return thunkAPI.rejectWithValue(message)
        }
    }
)

export const authSignIn = createAsyncThunk(
    'auth/authSignIn',
    async (user: SignInValues, thunkAPI) => {
        try {
            const response = await axios.post('users/signin', user)
            if (response.data) {
                localStorage.setItem('token', JSON.stringify(response.data))
            }
            return response.data
        } catch (error) {
            const err = error as AxiosError
            const message =
                (err.response &&
                    err.response.data &&
                    err.response.data.message) ||
                err.message ||
                err.toString()
            return thunkAPI.rejectWithValue(message)
        }
    }
)

export const authSignOut = createAsyncThunk(
    'auth/authSignOut',
    async (_, thunkAPI) => {
        localStorage.removeItem('token')
    }
)

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        authUser: userData ? userData : {},
        isSuccess: false,
        isLoading: false,
        isError: false,
        message: '',
    } as AuthState,
    reducers: {
        authReset: (state) => {
            state.isSuccess = false
            state.isLoading = false
            state.isError = false
            state.message = ''
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(authSignUp.pending, (state) => {
                state.isLoading = true
            })
            .addCase(authSignUp.fulfilled, (state, { payload }) => {
                state.isSuccess = true
                state.isLoading = false
                state.isError = false
                state.authUser = payload
                state.message = ''
            })
            .addCase(authSignUp.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.authUser = {}
                state.message = action.payload
            })
            .addCase(authSignIn.pending, (state) => {
                state.isLoading = true
            })
            .addCase(authSignIn.fulfilled, (state, { payload }) => {
                state.isSuccess = true
                state.isLoading = false
                state.isError = false
                state.authUser = payload
                state.message = ''
            })
            .addCase(authSignIn.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.authUser = {}
                state.message = action.payload
            })
            .addCase(authSignOut.fulfilled, (state) => {
                state.authUser = {}
            })
    },
})

export const { authReset } = authSlice.actions

export default authSlice.reducer
