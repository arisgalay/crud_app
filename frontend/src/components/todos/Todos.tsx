import React, { useState, useEffect } from 'react'
import { Button, Grid, Typography } from '@mui/material'
import ListTodos from './ListTodos'
import AddTodo from './AddTodo'
import { useAppSelector, useAppDispatch, Toast } from '../../state/hooks'
import { getTodos } from '../../state/features/todos/todosSlice'
import { authSignOut } from '../../state/features/auth/authSlice'
import LoadingTodo from './LoadingTodo'

const Todos: React.FC = () => {
    const [open, setOpen] = useState<boolean>(false)

    const openCloseHandler = () => {
        setOpen((prevState) => !prevState)
    }

    const dispatch = useAppDispatch()
    const { todoList, isError, isLoading, message } = useAppSelector(
        (state) => state.todos
    )

    useEffect(() => {
        if (isError) {
            Toast(message, 'error')
        }

        if (isError && message === 'Not Authorized.') {
            dispatch(authSignOut())
        }
    }, [dispatch, isError, message])

    useEffect(() => {
        dispatch(getTodos())
    }, [dispatch])

    const Notes = () => {
        if (!isLoading && todoList.length > 0) {
            return `Notes: ${todoList?.length}`
        }
        if (!isLoading && todoList.length < 1)
            return `Don't have notes yet, please create one.`
    }

    return (
        <>
            <AddTodo open={open} openCloseHandler={openCloseHandler} />
            <Grid container item spacing={2}>
                <Grid item xs={12}>
                    <Button
                        variant="contained"
                        color="secondary"
                        onClick={openCloseHandler}
                        sx={{
                            '&': {
                                color: '#fff',
                            },
                        }}
                    >
                        Add Note
                    </Button>
                </Grid>
                <Grid item xs={12}>
                    {!isLoading && todoList && (
                        <Typography variant="h6">{Notes()}</Typography>
                    )}
                </Grid>

                {todoList.length > 0
                    ? todoList.map(
                          ({ _id, notes, author, createdAt, isComplete }) => (
                              <Grid key={_id} item xs={12} sm={6} md={4}>
                                  <ListTodos
                                      _id={_id}
                                      notes={notes}
                                      author={author}
                                      createdAt={createdAt}
                                      isComplete={isComplete}
                                  />
                              </Grid>
                          )
                      )
                    : [...Array(1)].map((el, id) => (
                          <Grid key={id} item xs={12} sm={6} md={4}>
                              <LoadingTodo />
                          </Grid>
                      ))}
            </Grid>
        </>
    )
}

export default Todos
