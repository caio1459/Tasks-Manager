import { Container } from "./styles"

interface PropsHeader {
  abrirModalTarefas: () => void;
  abrirModalCategoria: () => void;
}

export const Header = (props: PropsHeader) => {
  return (
    <Container>
      <h1>Quadro de tarefas</h1>
      <div>
        <button type="button" onClick={props.abrirModalCategoria}>
          Nova Categoria
        </button>
        <button type="button" onClick={props.abrirModalTarefas}>
          Nova Tarefa
        </button>
      </div>
    </Container>
  )
}
