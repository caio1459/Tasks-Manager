import { FormEvent, useContext, useEffect, useState } from 'react'
import Modal from 'react-modal'
import { FormContainer } from './styles'
import { TarefaContext } from '../../contexts/tarefaContext';

interface PropsModal {
  modalVisible: boolean;
  fecharModal: () => void;
}

export function CustomModal(props: PropsModal) {
  const {
    createTarefa,
    editarTarefa,
    funSetTarefaDefault,
    updateTarefa,
    deletarTarefa
  } = useContext(TarefaContext);

  const [titulo, setTitulo] = useState('')
  const [descricao, setDescricao] = useState('')
  const [quadro, setQuadro] = useState('quadro1')

  useEffect(() => {
    if (editarTarefa.editar) {
      setTitulo(editarTarefa.tarefa?.titulo ? editarTarefa.tarefa.titulo : '')
      setDescricao(editarTarefa.tarefa?.descricao ? editarTarefa.tarefa.descricao : '')
      setQuadro(editarTarefa.tarefa?.quadro ? editarTarefa.tarefa.quadro : 'quadro1')
    }
  }, [editarTarefa.editar])

  function limparCamposEFecharModal() {
    setTitulo('')
    setDescricao('')
    setDescricao('quadro1')
    funSetTarefaDefault();
    props.fecharModal()
  }

  // onSubmitModal
  function criarTarefa(event: FormEvent) {
    event.preventDefault()

    if (editarTarefa.editar && editarTarefa.tarefa) {
      let objTarefa = {
        ...editarTarefa.tarefa,
        titulo,
        descricao,
        quadro
      }
      updateTarefa(objTarefa)


    } else {
      createTarefa({
        titulo: titulo,
        descricao,
        quadro
      })
    }

    limparCamposEFecharModal()

  }

  function onClickExcluirTarefa() {
    if (editarTarefa.tarefa) {
      deletarTarefa(editarTarefa.tarefa)
      limparCamposEFecharModal()
    }
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

        <select
          value={quadro}
          onChange={(val) => setQuadro(val.target.value)}
        >
          <option value="quadro1">Quadro 1</option>
          <option value="quadro2">Quadro 2</option>
          <option value="quadro3">Quadro 3</option>
        </select>

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

        <button type='submit'>
          Cadastrar
        </button>

        {
          editarTarefa.editar ?
            <button type='button'
              onClick={() => {
                onClickExcluirTarefa()
              }}
            >
              Excluir
            </button>
            :
            <></>
        }
      </FormContainer>

    </Modal>
  )
}
