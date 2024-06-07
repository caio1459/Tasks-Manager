import Modal from 'react-modal';
import { IPropsModal } from "../../interfaces/interfaces";
import { useForm } from 'react-hook-form';
import { useCallback, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../../contexts/AuthContext';
import { FormContainer } from '../../styles/global';

interface CategoryModalProps extends IPropsModal {
  fechCategory: () => void;
}

export const CategoryModal = ({ modalVisible, fecharModal, fechCategory }: CategoryModalProps) => {
  const { register, handleSubmit, reset } = useForm();
  const { headers } = useContext(AuthContext);

  const closeModal = useCallback(() => {
    reset();
    fecharModal();
  }, [fecharModal, reset]);

  const createCategory = useCallback((data: {}) => {
    // task
    axios.post("http://localhost:5000/api/category", data, headers)
      .then(() => {
        closeModal();
        //Reseta o estado so componente pai
        fechCategory();
      })
      .catch((err) => console.error(err));
  }, [headers, closeModal, fechCategory]);

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
      <FormContainer onSubmit={handleSubmit(createCategory)}>
        <h2>Cadastrar Categoria</h2>
        <input type="text" placeholder='Categoria' required {...register("description")} />
        <button type='submit'>
          Cadastrar
        </button>
      </FormContainer>
    </Modal>
  );
};
