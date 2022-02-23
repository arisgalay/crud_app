import React, { FC, useState } from 'react'
import {
    Card,
    CardContent,
    CardActions,
    Typography,
    Tooltip,
    ButtonGroup,
    Button,
} from '@mui/material'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import CreateIcon from '@mui/icons-material/Create'
import DeleteIcon from '@mui/icons-material/Delete'
import { completeTodo, Todo } from '../../state/features/todos/todosSlice'
import DeleteTodo from './DeleteTodo'
import { useAppDispatch } from '../../state/hooks'
import { useNavigate } from 'react-router-dom'
import UpdateTodo from './UpdateTodo'

const ListTodos: FC<Todo> = (props) => {
    const [delOpen, delSetOpen] = useState<boolean>(false)

    const delOpenCloseHandler = () => {
        delSetOpen((prevState) => !prevState)
    }

    const [updateOpen, updateSetOpen] = useState<boolean>(false)

    const updateOpenCloseHandler = () => {
        updateSetOpen((prevState) => !prevState)
    }

    const dispatch = useAppDispatch()
    const navigate = useNavigate()

    return (
        <>
            <DeleteTodo
                delOpen={delOpen}
                delOpenCloseHandler={delOpenCloseHandler}
                _id={props._id}
            />
            <UpdateTodo
                updateOpen={updateOpen}
                updateOpenCloseHandler={updateOpenCloseHandler}
                _id={props._id}
                notes={props.notes}
            />
            <Card elevation={4} sx={{ width: '100%' }}>
                <CardContent>
                    <Typography variant="subtitle1">{props.notes}</Typography>
                    <Typography variant="body2">
                        {`Author: ${props.author}`}
                    </Typography>
                    <Typography variant="body2">
                        {`Added: ${new Date(props.createdAt).toLocaleString()}`}
                    </Typography>
                </CardContent>
                <CardActions>
                    <ButtonGroup size="small" aria-label="button group">
                        <Tooltip
                            title={
                                props.isComplete
                                    ? 'Mark as incomplete'
                                    : 'Mark as completed'
                            }
                        >
                            <Button
                                onClick={() => {
                                    dispatch(completeTodo(props._id))
                                    navigate('/refresh')
                                }}
                            >
                                <CheckCircleIcon
                                    color={
                                        props.isComplete ? 'success' : 'action'
                                    }
                                />
                            </Button>
                        </Tooltip>
                        <Tooltip title="Edit">
                            <Button onClick={updateOpenCloseHandler}>
                                <CreateIcon color="info" />
                            </Button>
                        </Tooltip>
                        <Tooltip title="Delete">
                            <Button onClick={delOpenCloseHandler}>
                                <DeleteIcon color="error" />
                            </Button>
                        </Tooltip>
                    </ButtonGroup>
                </CardActions>
            </Card>
        </>
    )
}

export default ListTodos
