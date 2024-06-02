import React from 'react';
import { Container } from "./styles";
import { ITasks } from '../../interfaces/interfaces';

interface PropsListTarefas {
  abrirModal: () => void;
  tasks: ITasks[];
}

export const ListTarefas: React.FC<PropsListTarefas> = ({ abrirModal, tasks }) => {
  //Cria um agrupamento por categoria
  const tarefasPorCategoria = tasks.reduce((acc, tarefa) => {
    const categoria = tarefa.category.description;
    if (!acc[categoria]) {
      acc[categoria] = [];
    }
    acc[categoria].push(tarefa);
    return acc;
  }, {} as Record<string, ITasks[]>);

  return (
    <Container>
      {
        Object.keys(tarefasPorCategoria).map((categoria) => (
          <ul key={categoria}>
            <h3>{categoria}</h3>
            {
              tarefasPorCategoria[categoria].map((tarefa, index) => (
                <li key={index}>
                  <div>
                    <h3>{tarefa.title}</h3>
                    <p>{tarefa.description}</p>
                  </div>
                  <div>
                    <button type='button' onClick={abrirModal}>
                      Editar
                    </button>
                  </div>
                </li>
              ))
            }
          </ul>
        ))
      }
    </Container>
  );
};
