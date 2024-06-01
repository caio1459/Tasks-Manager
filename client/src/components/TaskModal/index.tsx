import { FormEvent, useContext, useEffect, useState } from 'react'
import Modal from 'react-modal'
import { FormContainer } from './styles'
import { ICategory } from '../../interfaces/interfaces';
import axios from 'axios';
import { AuthContext } from '../../contexts/AuthContext';

interface PropsModal {
  modalVisible: boolean;
  fecharModal: () => void;
}

export const TaskModal = (props: PropsModal) => {
  const [titulo, setTitulo] = useState('')
  const [descricao, setDescricao] = useState('')
  const [quadro, setQuadro] = useState('quadro1')
  const [categories, setCategories] = useState<ICategory[]>([])
  const { headers } = useContext(AuthContext)

  useEffect(() => {
    axios.get("http://localhost:5000/api/category", headers,)
      .then(res => setCategories(res.data))
      .catch(err => console.error(err))
  }, [])

  function limparCamposEFecharModal() {
    setTitulo('')
    setDescricao('')
    setDescricao('quadro1')
    props.fecharModal()
  }

  // onSubmitModal
  function criarTarefa(event: FormEvent) {
    event.preventDefault()
    limparCamposEFecharModal()
  }

  return (
    <Modal
      isOpen={props.modalVisible}
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

      <FormContainer
        onSubmit={criarTarefa}
      >
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
          {
            categories.map(category => (
              <option key={category.id} value={category.description}>
                {category.description}
              </option>
            ))
          }
        </select>
        <button type='submit'>
          Cadastrar
        </button>
      </FormContainer>

    </Modal>
  )
}
