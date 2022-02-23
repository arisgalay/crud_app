import React, { FC } from 'react'
import { useForm } from 'react-hook-form'
import {
    AppBar,
    Toolbar,
    Typography,
    IconButton,
    Button,
    Dialog,
    DialogContent,
    DialogActions,
    TextField,
} from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'
import { createTodo, Todo } from '../../state/features/todos/todosSlice'
import Joi from 'joi'
import { joiResolver } from '@hookform/resolvers/joi'
import { useAppDispatch } from '../../state/hooks'
import { useNavigate } from 'react-router-dom'

type Props = {
    open: boolean
    openCloseHandler: () => void
}

const schema = Joi.object().keys({
    notes: Joi.string().min(3).max(200).required().label('Notes').messages({
        'string.empty': 'This is required field.',
    }),
})

const AddTodo: FC<Props> = ({ open, openCloseHandler }) => {
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<Todo>({ resolver: joiResolver(schema) })

    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    return (
        <Dialog open={open} onClose={openCloseHandler} fullWidth>
            <AppBar elevation={0} sx={{ position: 'relative' }}>
                <Toolbar disableGutters>
                    <Typography
                        sx={{ ml: 2, flex: 1 }}
                        variant="h6"
                        component="div"
                    >
                        Create new note
                    </Typography>
                    <IconButton
                        edge="end"
                        color="inherit"
                        onClick={openCloseHandler}
                        aria-label="close"
                    >
                        <CloseIcon />
                    </IconButton>
                </Toolbar>
            </AppBar>
            <form
                noValidate
                onSubmit={handleSubmit(({ notes }) => {
                    dispatch(createTodo(notes))
                    reset({
                        notes: '',
                    })
                    openCloseHandler()
                    navigate('/refresh')
                })}
            >
                <DialogContent>
                    <TextField
                        label="Notes"
                        variant="outlined"
                        placeholder="What's on your mind?"
                        multiline
                        autoFocus
                        required
                        fullWidth
                        minRows={4}
                        {...register('notes')}
                        error={!!errors?.notes}
                        helperText={errors?.notes ? errors.notes.message : null}
                    />
                </DialogContent>
                <DialogActions>
                    <Button autoFocus onClick={openCloseHandler}>
                        Cancel
                    </Button>
                    <Button
                        color="secondary"
                        type="submit"
                        variant="contained"
                        sx={{
                            '&': {
                                color: '#fff',
                            },
                        }}
                    >
                        Submit
                    </Button>
                </DialogActions>
            </form>
        </Dialog>
    )
}

export default AddTodo
