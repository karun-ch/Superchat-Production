import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { Provider } from 'react-redux'
import store from './ReduxStateManagement/store.js'
import { GoogleOAuthProvider } from '@react-oauth/google'
const client_id="559063907138-06b706g2d50h5kqib52b39t4dvn33cpb.apps.googleusercontent.com";

createRoot(document.getElementById('root')).render(
    <Provider store={store}>
        <GoogleOAuthProvider clientId={client_id}>
    <App />
    </GoogleOAuthProvider>
    </Provider>
)
