import { BrowserRouter } from 'react-router-dom'
import { AppRoutes } from '@/routes'
import ClientWrapper from '@/components/ClientWrapper';

function App() {
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
