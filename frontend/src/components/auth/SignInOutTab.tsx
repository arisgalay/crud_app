import React, { FC, useState, SyntheticEvent, MouseEvent } from 'react'
import {
    Container,
    Card,
    CardContent,
    AppBar,
    Tabs,
    Tab,
    Typography,
    Link,
} from '@mui/material'
import SignIn from './SignIn'
import SignUp from './SignUp'

type TabPanelProps = {
    children?: React.ReactNode
    index: number
    value: number
}

const TabPanel = (props: TabPanelProps) => {
    const { children, value, index } = props
    return <>{value === index && children}</>
}

const SignInOutTab: FC = () => {
    const [value, setValue] = useState<number>(0)

    const tabPanelHandler = (event: SyntheticEvent, newValue: number) => {
        setValue(newValue)
    }

    return (
        <Container maxWidth="xs">
            <Card elevation={3}>
                <AppBar position="static">
                    <Tabs
                        value={value}
                        onChange={tabPanelHandler}
                        indicatorColor="secondary"
                        textColor="inherit"
                        variant="fullWidth"
                        aria-label="Sign in and Sign up tab"
                    >
                        <Tab label="Sign In" />
                        <Tab label="Sign Up" />
                    </Tabs>
                </AppBar>
                <CardContent>
                    <TabPanel value={value} index={0}>
                        <SignIn />
                        <Typography
                            variant="subtitle1"
                            sx={{ marginTop: '8px' }}
                        >
                            Do you have an account?{' '}
                            <Link
                                underline="none"
                                sx={{
                                    '&:hover': {
                                        cursor: 'pointer',
                                    },
                                }}
                                onClick={(event: MouseEvent) =>
                                    tabPanelHandler(event, 1)
                                }
                            >
                                Create new account
                            </Link>
                        </Typography>
                    </TabPanel>
                    <TabPanel value={value} index={1}>
                        <SignUp />
                        <Typography
                            variant="subtitle1"
                            sx={{ marginTop: '8px' }}
                        >
                            Already have an account?{' '}
                            <Link
                                underline="none"
                                sx={{
                                    '&:hover': {
                                        cursor: 'pointer',
                                    },
                                }}
                                onClick={(event: MouseEvent) =>
                                    tabPanelHandler(event, 0)
                                }
                            >
                                Sign In
                            </Link>
                        </Typography>
                    </TabPanel>
                </CardContent>
            </Card>
        </Container>
    )
}

export default SignInOutTab
