import { BrowserRouter } from 'react-router-dom'
import { AppRoutes } from '@/routes'
import ClientWrapper from '@/components/ClientWrapper';
import { useEffect } from 'react';
import { AppSocket } from '@/appsocket';
import Cookies from 'js-cookie';

function App() {
  useEffect(()=>{
      AppSocket.getInstance().init(`ws://localhost:8080/model_trade/ws?token=${Cookies.get("token")}`)
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
