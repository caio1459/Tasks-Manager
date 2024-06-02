import Modal from 'react-modal';
import { ICategory, IPropsModal } from '../../interfaces/interfaces';
import React, { FormEvent, useState } from 'react';
import { FormContainer } from '../../styles/global';

interface TaskModalProps extends IPropsModal {
  categories: ICategory[];
}

export const TaskModal: React.FC<TaskModalProps> = ({ modalVisible, fecharModal, categories }) => {
  const [titulo, setTitulo] = useState('');
  const [descricao, setDescricao] = useState('');
  const [quadro, setQuadro] = useState('quadro1');

  function limparCamposEFecharModal() {
    setTitulo('');
    setDescricao('');
    setQuadro('quadro1');
    fecharModal();
  }

  function criarTarefa(event: FormEvent) {
    event.preventDefault();
    limparCamposEFecharModal();
  }

  return (
    <Modal
      isOpen={modalVisible}
      overlayClassName="react-modal-overlay"
      className="react-modal-content"
      onRequestClose={limparCamposEFecharModal}
    >
      <button
        type='button'
        className='react-modal-close'
        onClick={limparCamposEFecharModal}
      >
        X
      </button>

      <FormContainer onSubmit={criarTarefa}>
        <h2>Cadastrar Tarefa</h2>
        <input
          type="text"
          placeholder='Título'
          required
          value={titulo}
          onChange={(event) => setTitulo(event.target.value)}
        />
        <textarea
          placeholder='Descriçao'
          required
          value={descricao}
          onChange={(event) => setDescricao(event.target.value)}
        />
        <select
          value={quadro}
          onChange={(val) => setQuadro(val.target.value)}
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
