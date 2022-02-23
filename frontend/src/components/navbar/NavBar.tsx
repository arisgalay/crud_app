import React, { FC, useState, useContext, MouseEvent, useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import {
    AppBar,
    Button,
    Toolbar,
    Container,
    Typography,
    Box,
    IconButton,
    Tooltip,
    Menu,
    MenuItem,
} from '@mui/material'
import useMediaQuery from '@mui/material/useMediaQuery'
import { useTheme, styled } from '@mui/material/styles'
import { themeContext } from '../../context/themeContext'
import NoteAltIcon from '@mui/icons-material/NoteAlt'
import MenuIcon from '@mui/icons-material/Menu'
import AccountBoxIcon from '@mui/icons-material/AccountBox'
import Brightness4Icon from '@mui/icons-material/Brightness4'
import Brightness7Icon from '@mui/icons-material/Brightness7'
import { useAppSelector, useAppDispatch, Toast } from '../../state/hooks'
import { authSignOut, authReset } from '../../state/features/auth/authSlice'

const ReactLink = styled(Link)`
    text-decoration: none;
    color: inherit;
`

const LogoButton = styled(Button)`
    color: inherit;
    background-color: transparent;
    text-transform: none;
    border-radius: 0;
    padding: 3px 0px;
    &:hover {
        background-color: transparent;
    }
`

const LOGO = (
    <LogoButton
        size="large"
        startIcon={<NoteAltIcon />}
        disableElevation
        disableRipple
    >
        <ReactLink to="/">
            <Typography variant="h6" component="h1">
                TakeNotes
            </Typography>
        </ReactLink>
    </LogoButton>
)

const NavBar: FC = () => {
    const [anchorNav, setAnchorNav] = useState<null | HTMLElement>(null)

    const anchorNavHandler = (event: MouseEvent<HTMLElement>) => {
        setAnchorNav((prevState) =>
            prevState === null ? event.currentTarget : null
        )
    }

    const [anchorUser, setAnchorUser] = useState<null | HTMLElement>(null)

    const anchorUserHandler = (event: MouseEvent<HTMLElement>) => {
        setAnchorUser((prevState) =>
            prevState === null ? event.currentTarget : null
        )
    }

    const themeCon = useContext(themeContext)
    const theme = useTheme()

    const navigate = useNavigate()
    const { pathname } = useLocation()
    const dispatch = useAppDispatch()
    const { authUser, isSuccess } = useAppSelector((state) => state.auth)

    useEffect(() => {
        if (authUser.name && pathname === '/') {
            navigate('/notes')
        }

        if (!authUser.name && pathname === '/notes') {
            navigate('/')
        }

        if (isSuccess && authUser) {
            Toast('Signing in...', 'success')
        }
    }, [navigate, dispatch, authUser, isSuccess, pathname])

    let matches = useMediaQuery('(min-width:900px)')
    let MenuBar
    matches
        ? (MenuBar = (
              <>
                  <Box sx={{ display: 'flex', flexGrow: 1 }}>{LOGO}</Box>
                  <Box sx={{ display: 'flex' }}>
                      {!authUser.name && (
                          <MenuItem>
                              <ReactLink to="/">
                                  <Typography>Login</Typography>
                              </ReactLink>
                          </MenuItem>
                      )}
                      {authUser.name && (
                          <MenuItem>
                              <ReactLink to="/notes">
                                  <Typography>Notes</Typography>
                              </ReactLink>
                          </MenuItem>
                      )}
                  </Box>
              </>
          ))
        : (MenuBar = (
              <>
                  <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
                      <IconButton
                          size="large"
                          edge="start"
                          color="inherit"
                          aria-label="menu appbar"
                          aria-controls="menu-appbar"
                          aria-haspopup="true"
                          onClick={anchorNavHandler}
                      >
                          <MenuIcon />
                      </IconButton>
                      <Menu
                          id="menu-appbar"
                          anchorEl={anchorNav}
                          open={Boolean(anchorNav)}
                          onClose={anchorNavHandler}
                          anchorOrigin={{
                              vertical: 'bottom',
                              horizontal: 'left',
                          }}
                          keepMounted
                          transformOrigin={{
                              vertical: 'top',
                              horizontal: 'left',
                          }}
                          sx={{ display: { xs: 'block', md: 'none' } }}
                      >
                          {!authUser.name && (
                              <MenuItem onClick={anchorNavHandler}>
                                  <ReactLink to="/">
                                      <Typography>Login</Typography>
                                  </ReactLink>
                              </MenuItem>
                          )}
                          {authUser.name && (
                              <MenuItem onClick={anchorNavHandler}>
                                  <ReactLink to="/notes">
                                      <Typography>Notes</Typography>
                                  </ReactLink>
                              </MenuItem>
                          )}
                      </Menu>
                  </Box>
                  <Box sx={{ display: 'flex', flexGrow: 1 }}>{LOGO}</Box>
              </>
          ))

    return (
        <>
            <AppBar elevation={3} position="static">
                <Container maxWidth="xl">
                    <Toolbar disableGutters>
                        {MenuBar}
                        <Tooltip
                            title={
                                theme.palette.mode === 'dark'
                                    ? 'Light Theme'
                                    : 'Dark Theme'
                            }
                        >
                            <IconButton
                                size="large"
                                color="inherit"
                                onClick={themeCon.toggleColorMode}
                            >
                                {theme.palette.mode === 'dark' ? (
                                    <Brightness7Icon
                                        sx={{
                                            '&:hover': {
                                                color: 'secondary.main',
                                            },
                                        }}
                                    />
                                ) : (
                                    <Brightness4Icon
                                        sx={{
                                            '&:hover': {
                                                color: 'secondary.main',
                                            },
                                        }}
                                    />
                                )}
                            </IconButton>
                        </Tooltip>
                        {authUser.name && (
                            <Tooltip title="Open user menu">
                                <IconButton
                                    size="large"
                                    color="inherit"
                                    onClick={anchorUserHandler}
                                >
                                    <AccountBoxIcon
                                        fontSize="inherit"
                                        sx={{
                                            '&:hover': {
                                                color: 'secondary.main',
                                            },
                                        }}
                                    />
                                </IconButton>
                            </Tooltip>
                        )}
                        <Menu
                            id="menu-appbar"
                            anchorEl={anchorUser}
                            open={Boolean(anchorUser)}
                            onClose={anchorUserHandler}
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'right',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                        >
                            <MenuItem onClick={anchorUserHandler}>
                                <ReactLink to="/">
                                    <Typography textAlign="center">
                                        My Profile
                                    </Typography>
                                </ReactLink>
                            </MenuItem>
                            <MenuItem onClick={anchorUserHandler}>
                                <ReactLink
                                    to="/"
                                    onClick={() => {
                                        dispatch(authSignOut())
                                        dispatch(authReset())
                                        Toast('Signing out...', 'success')
                                    }}
                                >
                                    <Typography textAlign="center">
                                        Log Out
                                    </Typography>
                                </ReactLink>
                            </MenuItem>
                        </Menu>
                    </Toolbar>
                </Container>
            </AppBar>
        </>
    )
}

export default NavBar
