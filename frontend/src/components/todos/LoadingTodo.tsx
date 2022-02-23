import React, { FC } from 'react'
import {
    Card,
    CardContent,
    CardActions,
    ButtonGroup,
    Skeleton,
} from '@mui/material'

const LoadingTodo: FC = () => {
    return (
        <Card elevation={4} sx={{ width: '100%' }}>
            <CardContent>
                <Skeleton animation="wave" variant="rectangular" height={50} />
                <Skeleton animation="wave" variant="text" />
                <Skeleton animation="wave" variant="text" />
            </CardContent>
            <CardActions>
                <ButtonGroup size="small" aria-label="button group">
                    <Skeleton
                        animation="wave"
                        variant="circular"
                        width={40}
                        height={40}
                    />
                    <Skeleton
                        animation="wave"
                        variant="circular"
                        width={40}
                        height={40}
                    />
                    <Skeleton
                        animation="wave"
                        variant="circular"
                        width={40}
                        height={40}
                    />
                </ButtonGroup>
            </CardActions>
        </Card>
    )
}

export default LoadingTodo
