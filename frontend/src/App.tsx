import React, { FC, useMemo } from 'react'
import useLocalStorage from './shared/hooks/use-localstorage'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Paper, Container, Typography } from '@mui/material'
import {
    ThemeProvider,
    PaletteMode,
    createTheme,
    responsiveFontSizes,
} from '@mui/material'
import NavBar from './components/navbar/NavBar'
import SignInOutTab from './components/auth/SignInOutTab'
import Todos from './components/todos/Todos'
import { themeContext } from './context/themeContext'
import { useAppSelector } from './state/hooks'
import Footer from './components/footer/Footer'
import Refresh from './components/refresh/Refresh'

const App: FC = () => {
    const [mode, setMode] = useLocalStorage<PaletteMode>('theme', 'light')

    const getDesignTokens = (mode: PaletteMode) => ({
        palette: {
            mode: mode,
            ...(mode === 'light'
                ? {
                      primary: {
                          main: '#009688',
                      },
                      secondary: {
                          main: '#ffc400',
                      },
                  }
                : {
                      background: {
                          default: '#001e3c',
                          paper: '#001e3c',
                      },
                  }),
        },
    })

    const colorMode = useMemo(
        () => ({
            // The dark mode switch would invoke this method
            toggleColorMode: () => {
                setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'))
            },
        }),
        [setMode]
    )

    // Update the theme only if the mode changes
    let theme = useMemo(() => createTheme(getDesignTokens(mode)), [mode])
    theme = responsiveFontSizes(theme)

    const { authUser } = useAppSelector((state) => state.auth)

    return (
        <themeContext.Provider value={colorMode}>
            <ThemeProvider theme={theme}>
                <BrowserRouter>
                    <NavBar />
                    <Paper
                        component="main"
                        elevation={0}
                        square
                        sx={{
                            paddingTop: (theme) => theme.spacing(2),
                            display: 'flex',
                            flexDirection: 'column',
                            minHeight: '100vh',
                            backgroundColor: 'background.default',
                        }}
                    >
                        <Container maxWidth="xl" sx={{ flexGrow: 1 }}>
                            <Routes>
                                {!authUser.name && (
                                    <Route
                                        path="/"
                                        element={<SignInOutTab />}
                                    />
                                )}
                                {authUser.name && (
                                    <Route path="/notes" element={<Todos />} />
                                )}
                                {authUser.name && (
                                    <Route
                                        path="/refresh"
                                        element={<Refresh />}
                                    />
                                )}
                                <Route
                                    path="*"
                                    element={
                                        <Typography
                                            variant="h6"
                                            textAlign="center"
                                        >
                                            Error 404: Page Not Found
                                        </Typography>
                                    }
                                />
                            </Routes>
                        </Container>

                        <Footer />
                    </Paper>
                </BrowserRouter>
            </ThemeProvider>
        </themeContext.Provider>
    )
}

export default App
