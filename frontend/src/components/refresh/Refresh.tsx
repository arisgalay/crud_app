import React, { useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { useAppSelector } from '../../state/hooks'

const Refresh: React.FC = () => {
    const isLoading = useAppSelector((state) => state.todos.isLoading)
    const navigate = useNavigate()
    const { pathname } = useLocation()

    useEffect(() => {
        if (!isLoading && pathname === '/refresh') {
            navigate('/notes')
        }
        return () => {
            navigate('/notes')
        }
    }, [navigate, pathname, isLoading])
    return <></>
}

export default Refresh
