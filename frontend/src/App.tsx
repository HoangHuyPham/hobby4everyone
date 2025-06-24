import { AppSocket } from '@/appsocket';
import ClientWrapper from '@/components/ClientWrapper';
import { AppRoutes } from '@/routes';
import Cookies from 'js-cookie';
import { useEffect } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { useNotification } from './hooks';

function App() {
  const { dispatchNotification } = useNotification()
  useEffect(() => {
    AppSocket.getInstance().init(`ws://localhost:8080/model_trade/ws?token=${Cookies.get("token")}`, dispatchNotification)
  }, [])
  return (
    <>
      <BrowserRouter>
        <ClientWrapper>
            <AppRoutes />
        </ClientWrapper>
      </BrowserRouter>
    </>
  )
}

export default App
