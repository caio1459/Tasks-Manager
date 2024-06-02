import Modal from 'react-modal';
import { ICategory, IPropsModal } from '../../interfaces/interfaces';
import React, { useCallback, useContext } from 'react';
import { FormContainer } from '../../styles/global';
import { AuthContext } from '../../contexts/AuthContext';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { SelectContainer } from './style';

interface TaskModalProps extends IPropsModal {
  categories: ICategory[];
  fechTasks: () => void;
}

export const TaskModal: React.FC<TaskModalProps> = ({ modalVisible, fecharModal, categories, fechTasks }) => {
  const { register, handleSubmit, reset } = useForm();
  const { headers } = useContext(AuthContext);   // Autorização de rotas (axios api)

  const closeModal = useCallback(() => {
    reset();
    fecharModal();
  }, [fecharModal, reset]);

  const criarTarefa = useCallback((data: { title?: string, description?: string, category?: string }) => {
    // Encontrar a categoria selecionada com base na descrição
    const selectedCategory = categories.find(category => category.description === data.category);

    const payload = {
      title: data.title,
      description: data.description,
      category: selectedCategory
    };

    axios.post("http://localhost:5000/api/task", payload, headers)
      .then(() => {
        closeModal();
        //Reseta o estado so componente pai
        fechTasks();
      })
      .catch((err) => console.error(err));
  }, [headers, closeModal, fechTasks, categories]);

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

      <FormContainer onSubmit={handleSubmit(criarTarefa)}>
        <h2>Cadastrar Tarefa</h2>
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
          Cadastrar
        </button>
      </FormContainer>
    </Modal>
  );
};
