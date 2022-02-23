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
import { Todo, updateTodo } from '../../state/features/todos/todosSlice'
import Joi from 'joi'
import { joiResolver } from '@hookform/resolvers/joi'
import { useAppDispatch, Toast } from '../../state/hooks'
import { useNavigate } from 'react-router-dom'

type Props = {
    updateOpen: boolean
    updateOpenCloseHandler: () => void
    _id: string
    notes: string
}

const schema = Joi.object().keys({
    notes: Joi.string().min(3).max(200).required().label('Notes').messages({
        'string.empty': 'This is required field.',
    }),
})

const UpdateTodo: FC<Props> = ({
    updateOpen,
    updateOpenCloseHandler,
    _id,
    notes,
}) => {
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<Todo>({ resolver: joiResolver(schema) })

    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    return (
        <Dialog open={updateOpen} onClose={updateOpenCloseHandler} fullWidth>
            <AppBar elevation={0} sx={{ position: 'relative' }}>
                <Toolbar disableGutters>
                    <Typography
                        sx={{ ml: 2, flex: 1 }}
                        variant="h6"
                        component="div"
                    >
                        Update Note
                    </Typography>
                    <IconButton
                        edge="end"
                        color="inherit"
                        onClick={updateOpenCloseHandler}
                        aria-label="close"
                    >
                        <CloseIcon />
                    </IconButton>
                </Toolbar>
            </AppBar>
            <form
                noValidate
                onSubmit={handleSubmit(({ notes }) => {
                    dispatch(updateTodo({ _id, notes }))

                    reset({
                        notes: '',
                    })
                    updateOpenCloseHandler()
                    Toast('Notes have been updated.', 'info')
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
                        defaultValue={notes}
                        minRows={4}
                        {...register('notes')}
                        error={!!errors?.notes}
                        helperText={errors?.notes ? errors.notes.message : null}
                    />
                </DialogContent>
                <DialogActions>
                    <Button autoFocus onClick={updateOpenCloseHandler}>
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
                        update
                    </Button>
                </DialogActions>
            </form>
        </Dialog>
    )
}

export default UpdateTodo
