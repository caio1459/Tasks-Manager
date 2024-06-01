import { useEffect, useState } from "react"
import { Header } from "../../components/Header"
import { ListTarefas } from "../../components/ListTarefas"
import { TarefasProvider } from "../../contexts/tarefaContext"
import { useNavigate } from "react-router-dom"
import Cookies from 'js-cookie';
import { TaskModal } from "../../components/TaskModal"
import { AuthContextProvider } from "../../contexts/AuthContext"

export const Home = () => {
  const [isVisibleModal, setIsVisibleModal] = useState(false)
  const navigate = useNavigate()
  const abrirModal = () => setIsVisibleModal(true)
  const fecharModal = () => setIsVisibleModal(false)

  useEffect(() => {
    const token = Cookies.get("@tasks:token")
    if (!token) navigate('/')
  }, [])

  return (
    <>
      <AuthContextProvider>
        <TarefasProvider>
          <Header
            abrirModal={abrirModal}
          />

          <ListTarefas
            abrirModal={abrirModal}
          />

          <TaskModal
            modalVisible={isVisibleModal}
            fecharModal={fecharModal}
          />
        </TarefasProvider>
      </AuthContextProvider>
    </>
  )
}