import Modal from 'react-modal';
import { ICategory, IPropsModal } from '../../interfaces/interfaces';
import React, { FormEvent, useCallback, useContext, useState } from 'react';
import { FormContainer } from '../../styles/global';
import { AuthContext } from '../../contexts/AuthContext';
import { useForm } from 'react-hook-form';
import axios from 'axios';

interface TaskModalProps extends IPropsModal {
  categories: ICategory[];
}

export const TaskModal: React.FC<TaskModalProps> = ({ modalVisible, fecharModal, categories }) => {
  const { register, handleSubmit, reset } = useForm();
  //atorização rotas(axios api)
  const { headers } = useContext(AuthContext);
  
  const closeModal = useCallback(() => {
    reset();
    fecharModal();
  }, [fecharModal, reset]);

  const criarTarefa = useCallback((data: {}) => {
    // task

    axios.post("http://localhost:5000/api/task", data, headers)

      .then(() => {
        closeModal();
        
      })
      .catch((err) => console.error(data));
  }, [headers, closeModal]);
  
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
        <select
          {...register("category.cat_id")}
        >
          {categories.map(category => (
            <option key={category.id} value={category.description}>
              {category.description}
            </option>
          ))}
        </select>
        <button type='submit'>
          Cadastrar
        </button>
      </FormContainer>
    </Modal>
  );
};
