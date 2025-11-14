import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { Provider } from 'react-redux'
import { store } from './Redux/store.ts'
import {  OureProvider } from './context/globale.tsx'

createRoot(document.getElementById('root')!).render(
    <Provider store={store}>
    <OureProvider >
    <App />
    </OureProvider>
    </Provider>
)
