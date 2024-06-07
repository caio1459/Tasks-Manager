import React, { useContext } from 'react';
import { Container } from "./styles";
import { ITasks } from '../../interfaces/interfaces';
import axios from 'axios';
import { AuthContext } from '../../contexts/AuthContext';

interface PropsListTarefas {
  abrirModal: () => void;
  tasks: ITasks[];
  fechTask: () => void;
}

export const ListTarefas: React.FC<PropsListTarefas> = ({ abrirModal, tasks, fechTask }) => {
  const { headers } = useContext(AuthContext)

  async function deleteList(id_list: number) {
    try {
      const { data } = await axios.delete("http://localhost:5000/api/task/" + id_list, headers);
      console.log(data)
      fechTask()
    } catch (error) {
      console.log(error)
      alert('Task error')
    }
  }

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
            <hr />
            {
              tarefasPorCategoria[categoria].map((tarefa, index) => (
                <li key={index}>
                  <div>
                    <h3>{tarefa.title}</h3>
                    <p>{tarefa.description}</p>
                  </div>
                  <div>
                    <button type='button' className='btn btn-info' onClick={abrirModal}>
                      <i className="bi bi-pen"></i>
                    </button>
                    <button
                      type='button'
                      className='ms-1 btn btn-danger'
                      onClick={() => { deleteList(tarefa.task_id) }}
                    >
                      <i className="bi bi-trash"></i>
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
