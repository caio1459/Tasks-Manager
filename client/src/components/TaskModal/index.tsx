import Modal from 'react-modal';
import { ICategory, IPropsModal, ITasks } from '../../interfaces/interfaces';
import React, { useCallback, useContext, useEffect } from 'react';
import { FormContainer } from '../../styles/global';
import { AuthContext } from '../../contexts/AuthContext';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { SelectContainer } from './style';

interface TaskModalProps extends IPropsModal {
  task?: ITasks;
  categories: ICategory[];
  fechTasks: () => void;
}

export const TaskModal: React.FC<TaskModalProps> = ({ modalVisible, fecharModal, task, categories, fechTasks }) => {
  const { register, handleSubmit, reset, setValue } = useForm();
  const { headers } = useContext(AuthContext);

  useEffect(() => {
    if (task) {
      setValue('title', task.title);
      setValue('description', task.description);
      setValue('category', task.category.description);
    } else {
      reset();
    }
  }, [task, setValue, reset]);

  const closeModal = useCallback(() => {
    reset();
    fecharModal();
  }, [fecharModal, reset]);

  const onSubmit = useCallback((data: { title?: string, description?: string, category?: string }) => {
    const selectedCategory = categories.find(category => category.description === data.category);

    const payload = {
      title: data.title,
      description: data.description,
      category: selectedCategory
    };

    const request = task
      ? axios.put(`http://localhost:5000/api/task/${task.task_id}`, payload, headers)
      : axios.post("http://localhost:5000/api/task", payload, headers);

    request.then(() => {
      closeModal();
      fechTasks();
    }).catch((err) => console.error(err));
  }, [headers, closeModal, fechTasks, categories, task]);

  return (
    <Modal
      isOpen={modalVisible}
      overlayClassName="react-modal-overlay"
      className="react-modal-content"
      onRequestClose={closeModal}
    >
      <button type='button' className='react-modal-close' onClick={closeModal}>
        X
      </button>

      <FormContainer onSubmit={handleSubmit(onSubmit)}>
        <h2>{task ? "Editar Tarefa" : "Cadastrar Tarefa"}</h2>
        <input type="text" placeholder='Titulo' required {...register("title")} />
        <textarea
          placeholder='Descrição'
          required
          {...register("description")}
        />
        <SelectContainer>
          <label htmlFor="category">Categoria:</label>
          <select
            id='category'
            {...register("category")}
          >
            {categories.map(category => (
              <option key={category.cat_id} value={category.description}>
                {category.description}
              </option>
            ))}
          </select>
        </SelectContainer>
        <button type='submit'>
          {task ? "Salvar" : "Cadastrar"}
        </button>
      </FormContainer>
    </Modal>
  );
};
