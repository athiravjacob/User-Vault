import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { Provider } from 'react-redux';
import store,{persistor} from './redux/store';
import { Toaster } from 'react-hot-toast'
import { PersistGate } from 'redux-persist/integration/react';


createRoot(document.getElementById('root')).render(
  <StrictMode>
   <Provider store={store}>
   <PersistGate loading={<div>Loading...</div>} persistor={persistor}>
        <App />
    <Toaster position="top-right" reverseOrder={false} />

    </PersistGate>
  </Provider>,

  </StrictMode>,
)
