import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'
import { AxiosError } from 'axios'
import axios, { setHeaders } from '../../../api'
import { RootState } from '../../store'
export interface TodoState {
    todoList: Todo[]
    isLoading: boolean
    isError: boolean
    message: string
}

export interface Todo {
    _id: string
    notes: string
    author: string
    isComplete: boolean
    createdAt: string
}

export interface UpdateTodoValue {
    _id: string
    notes: string
}

export const getTodos = createAsyncThunk(
    'todos/getTodos',
    async (_, thunkAPI) => {
        try {
            const { auth } = thunkAPI.getState() as RootState
            const accessToken: {
                authUser: {
                    accessToken: string
                }
            } = auth.authUser.accessToken

            if (!accessToken) {
                throw String('Invalid Token.')
            }

            const response = await axios.get('todos', setHeaders(accessToken))
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

export const createTodo = createAsyncThunk(
    'todos/createTodo',
    async (notes: string, thunkAPI) => {
        try {
            const { auth } = thunkAPI.getState() as RootState
            const accessToken: {
                authUser: {
                    accessToken: string
                }
            } = auth.authUser.accessToken

            const response = await axios.post(
                'todos',
                { notes },
                setHeaders(accessToken)
            )
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

export const completeTodo = createAsyncThunk(
    'todos/completeTodo',
    async (_id: string, thunkAPI) => {
        try {
            const { auth } = thunkAPI.getState() as RootState
            const accessToken: {
                authUser: {
                    accessToken: string
                }
            } = auth.authUser.accessToken

            const response = await axios.patch(
                `todos/${_id}`,
                {
                    isComplete: (prevState: boolean) => !prevState,
                },
                setHeaders(accessToken)
            )
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

export const updateTodo = createAsyncThunk(
    'todos/updateTodo',
    async (todo: UpdateTodoValue, thunkAPI) => {
        try {
            const { _id, notes } = todo
            const { auth } = thunkAPI.getState() as RootState
            const accessToken: {
                authUser: {
                    accessToken: string
                }
            } = auth.authUser.accessToken

            const response = await axios.put(
                `todos/${_id}`,
                { notes },
                setHeaders(accessToken)
            )
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

export const deleteTodo = createAsyncThunk(
    'todos/completeTodo',
    async (_id: string, thunkAPI) => {
        try {
            const { auth } = thunkAPI.getState() as RootState
            const accessToken: {
                authUser: {
                    accessToken: string
                }
            } = auth.authUser.accessToken

            const response = await axios.delete(
                `todos/${_id}`,
                setHeaders(accessToken)
            )
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

const todosSlice = createSlice({
    name: 'todos',
    initialState: {
        todoList: [],
        isLoading: false,
        isError: false,
        message: '',
    } as TodoState,
    reducers: {
        resetTodos: (state) => {
            state.todoList = []
            state.isLoading = false
            state.isError = false
            state.message = ''
        },
    },
    extraReducers: {
        [`${getTodos.pending}`]: (state) => {
            state.isLoading = true
        },
        [`${getTodos.fulfilled}`]: (state, action: PayloadAction<Todo[]>) => {
            state.isLoading = false
            state.isError = false
            state.todoList = action.payload
        },
        [`${getTodos.rejected}`]: (state, action) => {
            state.isLoading = false
            if (action.payload === 'Invalid Token.') {
                state.isError = false
            } else {
                state.isError = true
                state.message = action.payload
            }
        },
        [`${createTodo.pending}`]: (state) => {
            state.isLoading = true
        },
        [`${createTodo.fulfilled}`]: (state, action: PayloadAction<Todo[]>) => {
            state.isLoading = false
            state.isError = false
            state.todoList = action.payload
        },
        [`${createTodo.rejected}`]: (state, action) => {
            state.isLoading = false
            state.isError = true
            state.message = action.payload
        },
        [`${completeTodo.pending}`]: (state) => {
            state.isLoading = true
        },
        [`${completeTodo.fulfilled}`]: (state, action) => {
            state.isLoading = false
            state.isError = false
            state.todoList = action.payload
        },
        [`${completeTodo.rejected}`]: (state, action) => {
            state.isLoading = false
            state.isError = true
            state.message = action.payload
        },
        [`${deleteTodo.pending}`]: (state) => {
            state.isLoading = true
        },
        [`${deleteTodo.fulfilled}`]: (state, action) => {
            state.isLoading = false
            state.isError = false
            state.todoList = state.todoList.filter(
                (todo) => todo._id !== action.payload
            )
        },
        [`${deleteTodo.rejected}`]: (state, action) => {
            state.isLoading = false
            state.isError = true
            state.message = action.payload
        },
    },
})

export const { resetTodos } = todosSlice.actions

export default todosSlice.reducer
