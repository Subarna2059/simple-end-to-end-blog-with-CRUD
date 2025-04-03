import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import TosatifyContainer from './components/TosatifyContainer.jsx'

createRoot(document.getElementById('root')).render(
  <>
    <TosatifyContainer />
    <App />
    </>
)
