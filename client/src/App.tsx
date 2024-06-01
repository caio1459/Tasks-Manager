import Modal from 'react-modal'
import { GlobalStyle } from "./styles/global"
import { Rotas } from './routes/routes'

Modal.setAppElement('#root')

function App() {
  return (
    <>
      <GlobalStyle />
      <Rotas />
    </>
  )
}

export default App
