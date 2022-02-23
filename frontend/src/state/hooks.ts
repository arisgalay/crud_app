import { TypedUseSelectorHook, useSelector, useDispatch } from 'react-redux'
import { RootState, AppDispatch } from './store'
import { toast, ToastContent, TypeOptions } from 'react-toastify'

export const Toast = (content: ToastContent, type: TypeOptions = 'default') => {
    toast(content, {
        type,
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 2000,
        theme: 'colored',
    })
}

export const useAppDispatch = () => useDispatch<AppDispatch>()
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
