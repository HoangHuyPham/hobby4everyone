import { createRoot } from 'react-dom/client'
import '@/styles/index.css'
import App from './App'
import { Slide, ToastContainer } from 'react-toastify'

createRoot(document.getElementById('root')!).render(
  <>
    <ToastContainer
      position="bottom-right"
      autoClose={5000}
      hideProgressBar={false}
      newestOnTop
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme="light"
      transition={Slide}
    />
    <App />
  </>
)
