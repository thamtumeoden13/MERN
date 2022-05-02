import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useLocation, useNavigate } from 'react-router-dom'
import { GoogleLogin } from 'react-google-login'

import Container from '@mui/material/Container'
import Grid from '@mui/material/Grid'
import Avatar from '@mui/material/Avatar'
import Paper from '@mui/material/Paper'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'

import Input from '../common/Input'
import Icon from '../common/Icon'

import { AUTH } from '../../redux/constants/actionType'
import { signIn, signUp } from '../../redux/actions/auth'

import useStyles from './styles'

const initFormData = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: ''
}

const Auth = () => {
    const classes = useStyles()
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const location = useLocation();

    const [isSignup, setIsSignup] = useState(false);
    const [showPassword, setShowPassword] = useState(false)
    const [formData, setFormData] = useState(initFormData)

    const from = location.state?.from?.pathname || "/";

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (isSignup) {
            dispatch(signUp(formData, navigate, from))
        } else {
            dispatch(signIn(formData, navigate, from))
        }
    }

    const handleShowPassword = () => {
        setShowPassword((prevShowPassWord) => !prevShowPassWord)
    }

    const switchMode = () => {
        setIsSignup((preIsSignUp) => !preIsSignUp)
        setShowPassword(false)
    }

    const googleSuccess = async (res) => {
        console.log('googleSuccess', res)

        const result = res?.profileObj
        const token = res?.tokenId

        try {
            dispatch({ type: AUTH, payload: { result, token } })
            navigate(from, { replace: true });
        } catch (error) {
            console.error(error)
        }
    }

    const googleFailure = async (err) => {
        console.log('Google Sign In was unsuccessful, Try Again Later')
    }

    return (
        <Container component='main' maxWidth='xs'>
            <Paper
                className={classes.paper}
                elevation={3}
            >
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography
                    component="h1"
                    variant='h5'
                >
                    {isSignup ? `Đăng Ký` : `Đăng Nhập`}
                </Typography>
                <form
                    className={classes.form}
                    onSubmit={handleSubmit}
                >
                    <Grid
                        container
                        spacing={2}
                    >
                        {isSignup && (
                            <>
                                <Input
                                    name='firstName'
                                    label='Họ'
                                    autoFocus
                                    half
                                    handleChange={handleChange}
                                />
                                <Input
                                    name='lastName'
                                    label='Tên'
                                    half
                                    handleChange={handleChange}
                                />
                            </>
                        )}
                        <Input
                            name='email'
                            label='Đia chỉ mail'
                            type='emai;'
                            handleChange={handleChange}
                        />
                        <Input
                            name='password'
                            label='Mật khẩu'
                            type={showPassword ? 'text' : 'password'}
                            handleChange={handleChange}
                            handleShowPassword={handleShowPassword}
                        />
                        {isSignup &&
                            <Input
                                name='confirmPassword'
                                label='Nhập lại mật khẩu'
                                type='password'
                                handleChange={handleChange}
                            />
                        }
                    </Grid>
                    <Button
                        type='submit'
                        fullWidth
                        variant='contained'
                        color='primary'
                        className={classes.googleButton}
                    >
                        {isSignup ? 'Đăng Ký' : 'Đăng Nhập'}
                    </Button>
                    <GoogleLogin
                        clientId='711608998315-74dlgofriutfd2h0k2dovspne0mqqg6q.apps.googleusercontent.com'
                        render={(renderProps) => (
                            <Button
                                className={classes.googleButton}
                                color='primary'
                                fullWidth
                                onClick={renderProps.onClick}
                                disabled={renderProps.disabled}
                                startIcon={<Icon />}
                                variant='contained'
                            >
                                {`Google Sign In`}
                            </Button>
                        )}
                        onSuccess={googleSuccess}
                        onFailure={googleFailure}
                        cookiePolicy='single_host_origin'
                    />
                    <Grid container justifyContent='flex-end'>
                        <Grid item>
                            <Button onClick={switchMode}>
                                {isSignup ? 'Already have an account? Sign In' : "Don't Have an account? Sign Up"}
                            </Button>
                        </Grid>
                    </Grid>
                </form>
            </Paper>
        </Container>
    )
}

export default Auth