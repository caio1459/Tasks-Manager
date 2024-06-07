import { useNavigate } from "react-router-dom";
import { Container } from "./styles"
import Cookies from 'js-cookie';
import image from '/imagens/task_icon.png';

interface PropsHeader {
  abrirModalTarefas: () => void;
  abrirModalCategoria: () => void;
}

export const Header = (props: PropsHeader) => {
  const navigation = useNavigate();

  function deslogar() {
    if (confirm('Deseja deslogar?')) {
      Cookies.remove("@tasks:token");
      navigation('/');
    }
  }

  return (
    <Container>
      <div>
        <h1>Tasks Manager</h1>
        <img src={image} alt="Img Icon" />
      </div>
      <div>
        <button type="button" onClick={props.abrirModalCategoria}>
          Nova Categoria
        </button>
        <button type="button" onClick={props.abrirModalTarefas}>
          Nova Tarefa
        </button>
        <button type="button" className="btn-logout" title="Deslogar" onClick={deslogar}>
          <i className="bi bi-door-open"></i>
        </button>
      </div>
    </Container>
  )
}
