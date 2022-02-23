import axios from 'axios'

export const setHeaders = (token: {
    authUser: {
        accessToken: string
    }
}) => {
    return {
        headers: {
            'x-auth-token': `Bearer ${token}`,
        },
    }
}

export default axios.create({
    baseURL: process.env.REACT_APP_BACKEND_URI,
})
