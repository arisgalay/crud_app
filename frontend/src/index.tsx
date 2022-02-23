import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { ToastContainer } from 'react-toastify'
import { store } from '../src/state/store'
import App from './App'
import './index.css'
import 'react-toastify/dist/ReactToastify.min.css'

render(
    <React.StrictMode>
        <Provider store={store}>
            <ToastContainer />
            <App />
        </Provider>
    </React.StrictMode>,
    document.getElementById('root')
)
