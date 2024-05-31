import axios from "axios";
import {
  ReactNode,
  createContext,
  useState,
  useEffect
} from "react";
import { Loading } from "../components/Loading";

interface Tarefas {
  titulo: string;
  descricao: string;
  quadro: string;
}
interface TarefasWithID {
  id: string;
  titulo: string;
  descricao: string;
  quadro: string;
}

// exemplo de type para omitir atributo
// type TarefaExample = Omit<TarefasWithID, 'id' | `titulo`>

interface DataEditarTarefa {
  editar: boolean;
  tarefa: TarefasWithID | null;
}

interface PropsTarefaContext {
  tarefas: Array<TarefasWithID>;
  createTarefa: (tarefas: Tarefas) => Promise<void>;
  updateTarefa: (tarefas: TarefasWithID) => Promise<void>;
  funEditarTarefa: (tarefas: DataEditarTarefa) => void;
  funSetTarefaDefault: () => void;
  editarTarefa: DataEditarTarefa;
  deletarTarefa: (tarefas: TarefasWithID) => Promise<void>;
}
export const TarefaContext = createContext(
  {} as PropsTarefaContext
)

interface PropsTarefaProvider {
  children: ReactNode
}
// export function TarefasProvider(props: PropsTarefaProvider) {
export function TarefasProvider({ children }: PropsTarefaProvider) {

  const [tarefas, setTarefas] = useState([])

  const [editarTarefa, setEditarTarefas] = useState<DataEditarTarefa>({ editar: false, tarefa: null })

  useEffect(() => {
    axios.get('/api/tarefas')
      .then((res) => {
        console.log(res.data)
        setTarefas(res.data.tarefas)
      })
  }, [])

  async function createTarefa(data: Tarefas) {
    await axios.post('/api/tarefas', data)
    axios.get('/api/tarefas').then((res) => {
      setTarefas(res.data.tarefas)
    })
  }

  async function updateTarefa(data: TarefasWithID) {
    await axios.put('/api/tarefas', data)
    axios.get('/api/tarefas').then((res) => {
      setTarefas(res.data.tarefas)
    })
  }

  async function deletarTarefa(data: TarefasWithID) {
    await axios.delete('/api/tarefas/' + data.id, {
      data: data
    })
    axios.get('/api/tarefas').then((res) => {
      setTarefas(res.data.tarefas)
    })
  }

  function funSetTarefaDefault() {
    setEditarTarefas({ editar: false, tarefa: null })
  }

  function funEditarTarefa(data: DataEditarTarefa) {
    setEditarTarefas(data)
  }

  return (
    <TarefaContext.Provider value={{
      tarefas,
      createTarefa,
      editarTarefa,
      funEditarTarefa,
      funSetTarefaDefault,
      updateTarefa,
      deletarTarefa
    }}>
      <Loading visible={false} />
      {children}
    </TarefaContext.Provider>
  )
}
