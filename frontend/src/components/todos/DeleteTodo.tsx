import React, { FC } from 'react'
import {
    AppBar,
    Toolbar,
    Typography,
    IconButton,
    Button,
    Dialog,
    DialogContent,
    DialogActions,
} from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'
import { deleteTodo } from '../../state/features/todos/todosSlice'
import { Toast, useAppDispatch } from '../../state/hooks'
import { useNavigate } from 'react-router-dom'

type Props = {
    delOpen: boolean
    delOpenCloseHandler: () => void
    _id: string
}

const DeleteTodo: FC<Props> = ({ delOpen, delOpenCloseHandler, _id }) => {
    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    return (
        <Dialog open={delOpen} onClose={delOpenCloseHandler} fullWidth>
            <AppBar elevation={0} sx={{ position: 'relative' }}>
                <Toolbar disableGutters>
                    <Typography
                        sx={{ ml: 2, flex: 1 }}
                        variant="h6"
                        component="div"
                    >
                        Delete Note
                    </Typography>
                    <IconButton
                        edge="end"
                        color="inherit"
                        onClick={delOpenCloseHandler}
                        aria-label="close"
                    >
                        <CloseIcon />
                    </IconButton>
                </Toolbar>
            </AppBar>
            <DialogContent>
                <Typography>Are you sure?</Typography>
            </DialogContent>
            <DialogActions>
                <Button
                    autoFocus
                    onClick={() => {
                        delOpenCloseHandler()
                    }}
                >
                    Cancel
                </Button>
                <Button
                    color="error"
                    type="submit"
                    variant="contained"
                    sx={{
                        '&': {
                            color: '#fff',
                        },
                    }}
                    onClick={() => {
                        dispatch(deleteTodo(_id))
                        Toast('Notes have been deleted.', 'info')
                        navigate('/refresh')
                    }}
                >
                    Delete
                </Button>
            </DialogActions>
        </Dialog>
    )
}

export default DeleteTodo
