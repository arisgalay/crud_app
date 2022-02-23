import React, { FC, useEffect } from 'react'
import { TextField, Avatar, Button } from '@mui/material'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import { useForm } from 'react-hook-form'
import Joi from 'joi'
import { joiResolver } from '@hookform/resolvers/joi'
import {
    SignInValues,
    authSignIn,
    authReset,
} from '../../state/features/auth/authSlice'
import { useAppDispatch, useAppSelector, Toast } from '../../state/hooks'

const schema = Joi.object().keys({
    email: Joi.string()
        .min(3)
        .max(200)
        .email({ tlds: { allow: false } })
        .required()
        .label('Email')
        .messages({
            'string.empty': 'This field is required.',
            'string.email': 'Invalid, please type valid email address.',
        }),
    password: Joi.string()
        .min(6)
        .max(200)
        .required()
        .label('Password')
        .messages({
            'string.empty': 'This field is required.',
        }),
})

const SignIn: FC = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<SignInValues>({ resolver: joiResolver(schema) })

    const dispatch = useAppDispatch()

    const { isError, message } = useAppSelector((state) => state.auth)
    useEffect(() => {
        if (isError) {
            Toast(message, 'error')
        }

        return () => {
            dispatch(authReset())
        }
    }, [dispatch, isError, message])

    return (
        <>
            <Avatar
                sx={{
                    marginX: 'auto',
                    marginBottom: '8px',
                    '&': {
                        bgcolor: 'secondary.main',
                        color: '#fff',
                    },
                }}
            >
                <LockOutlinedIcon />
            </Avatar>
            <form
                noValidate
                onSubmit={handleSubmit((data) => {
                    dispatch(authSignIn(data))
                })}
            >
                <TextField
                    label="Email"
                    type="email"
                    variant="outlined"
                    margin="dense"
                    autoFocus
                    fullWidth
                    required
                    {...register('email')}
                    error={!!errors?.email}
                    helperText={errors?.email ? errors.email.message : null}
                />
                <TextField
                    label="Password"
                    type="password"
                    variant="outlined"
                    margin="dense"
                    fullWidth
                    required
                    sx={{
                        "input[type='password']::-ms-reveal, input[type='password']::-ms-clear":
                            {
                                filter: ({ palette }) =>
                                    palette.mode === 'dark'
                                        ? 'invert(100%)'
                                        : '',
                            },
                    }}
                    {...register('password')}
                    error={!!errors?.password}
                    helperText={
                        errors?.password ? errors.password.message : null
                    }
                />
                <Button
                    type="submit"
                    variant="contained"
                    color="secondary"
                    sx={{
                        marginTop: '8px',
                        '&': {
                            color: '#fff',
                        },
                    }}
                >
                    Sign in
                </Button>
            </form>
        </>
    )
}

export default SignIn
