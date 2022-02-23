import React, { FC } from 'react'
import {
    Box,
    IconButton,
    Typography,
    Container,
    Stack,
    styled,
} from '@mui/material'
import GitHubIcon from '@mui/icons-material/GitHub'
import InstagramIcon from '@mui/icons-material/Instagram'
import LinkedInIcon from '@mui/icons-material/LinkedIn'

const IconBtn = styled(IconButton)(({ theme }) => ({
    '&:hover': {
        color: theme.palette.secondary.main,
    },
}))

const Link = styled('a')(({ theme }) => ({
    textDecoration: 'none',
    color: 'inherit',
}))

const Footer: FC = () => {
    return (
        <Box component="footer">
            <Container maxWidth="xl" sx={{ flexShrink: 0, mt: 1 }}>
                <Stack
                    direction="row"
                    justifyContent="center"
                    alignItems="flex-end"
                    spacing={2}
                >
                    <Link
                        href="https://www.github.com/arisgalay"
                        target="_blank"
                        rel="noreferrer"
                    >
                        <IconBtn size="large" aria-label="Github">
                            <GitHubIcon />
                        </IconBtn>
                    </Link>

                    <Link
                        href="https://www.linkedin.com/in/arisgalay"
                        target="_blank"
                        rel="noreferrer"
                    >
                        <IconBtn size="large" aria-label="LinkedIn">
                            <LinkedInIcon />
                        </IconBtn>
                    </Link>
                    <Link
                        href="https://www.instagram.com/arisgalay_"
                        target="_blank"
                        rel="noreferrer"
                    >
                        <IconBtn size="large" aria-label="Instagram">
                            <InstagramIcon />
                        </IconBtn>
                    </Link>
                </Stack>
                <Typography
                    variant="h6"
                    textAlign="center"
                    color="text.secondary"
                >
                    © {new Date().getFullYear()}
                </Typography>
            </Container>
        </Box>
    )
}

export default Footer
