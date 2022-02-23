import React, { FC, useEffect } from 'react'
import { Avatar, TextField, Button } from '@mui/material'
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt'
import { useForm } from 'react-hook-form'
import Joi from 'joi'
import { joiResolver } from '@hookform/resolvers/joi'
import {
    SignUpValues,
    authSignUp,
    authReset,
} from '../../state/features/auth/authSlice'
import { useAppDispatch, useAppSelector, Toast } from '../../state/hooks'

const schema = Joi.object().keys({
    name: Joi.string()
        .pattern(new RegExp(/^[a-z ,.'-]+$/i))
        .min(2)
        .max(30)
        .required()
        .label('Name')
        .messages({
            'string.pattern.base': 'Invalid, please type your name.',
            'string.empty': 'This field is required.',
        }),
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
    repeat_password: Joi.string()
        .empty('')
        .min(6)
        .max(200)
        .required()
        .valid(Joi.ref('password'))
        .label('Re-type Password')
        .messages({
            'any.required': 'This field is required.',
            'any.only': 'Password does not match',
        })
        .strip(),
})

const SignUp: FC = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<SignUpValues>({ resolver: joiResolver(schema) })

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
            {' '}
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
                <PersonAddAltIcon />
            </Avatar>
            <form
                noValidate
                onSubmit={handleSubmit((data) => {
                    dispatch(authSignUp(data))
                })}
            >
                <TextField
                    label="Name"
                    type="text"
                    variant="outlined"
                    margin="dense"
                    autoFocus
                    fullWidth
                    required
                    {...register('name')}
                    error={!!errors?.name}
                    helperText={errors?.name ? errors.name.message : null}
                />
                <TextField
                    label="Email"
                    type="email"
                    variant="outlined"
                    margin="dense"
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
                <TextField
                    label="Re-type Password"
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
                    {...register('repeat_password')}
                    error={!!errors?.repeat_password}
                    helperText={
                        errors?.repeat_password
                            ? errors.repeat_password.message
                            : null
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
                    Sign Up
                </Button>
            </form>
        </>
    )
}

export default SignUp
