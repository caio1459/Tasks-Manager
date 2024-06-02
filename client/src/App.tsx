import Modal from 'react-modal'
import { GlobalStyle } from "./styles/global"
import { Rotas } from './routes/routes'
import { AuthContextProvider } from './contexts/AuthContext'

Modal.setAppElement('#root')

function App() {
  return (
    <>
      <GlobalStyle />
      <AuthContextProvider>
        <Rotas />
      </AuthContextProvider>
    </>
  )
}

export default App
