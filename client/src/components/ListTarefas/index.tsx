import { useContext } from 'react'
import { Container } from "./styles";
import { TarefaContext } from '../../contexts/tarefaContext';

interface PropsListTarefas {
    abrirModal: () => void;
}

export function ListTarefas(props: PropsListTarefas) {

    const { tarefas, funEditarTarefa } = useContext(TarefaContext)

    return (
        <>
            <Container>
                <ul>
                    <h3>
                        Quadro 1
                    </h3>

                    {
                        tarefas.map((tarefa, index) => {
                            return (
                                tarefa.quadro === 'quadro1' ?
                                    <li
                                        key={index}
                                    >
                                        <div>
                                            <h4>
                                                {tarefa.titulo}
                                            </h4>
                                            <p>{tarefa.descricao}</p>
                                        </div>
                                        <div>
                                            <button
                                                type='button'
                                                onClick={() => {
                                                    funEditarTarefa({ editar: true, tarefa: tarefa })
                                                    props.abrirModal();
                                                }}
                                            >
                                                Editar
                                            </button>
                                        </div>

                                    </li>
                                    :
                                    <></>
                            )
                        })
                    }

                </ul>
                <ul>
                    <h3>
                        Quadro 2
                    </h3>

                    {
                        tarefas.map((tarefa, index) => {
                            return (
                                tarefa.quadro === 'quadro2' ?
                                    <li
                                        key={index}
                                    >
                                        <div>
                                            <h4>
                                                {tarefa.titulo}
                                            </h4>
                                            <p>{tarefa.descricao}</p>
                                        </div>
                                        <div>
                                            <button
                                                type='button'
                                                onClick={() => {
                                                    funEditarTarefa({ editar: true, tarefa: tarefa })
                                                    props.abrirModal();
                                                }}
                                            >
                                                Editar
                                            </button>
                                        </div>

                                    </li>
                                    :
                                    <></>
                            )
                        })
                    }

                </ul>
                <ul>
                    <h3>
                        Quadro 3
                    </h3>

                    {
                        tarefas.map((tarefa, index) => {
                            return (
                                tarefa.quadro === 'quadro3' ?
                                <li
                                    key={index}
                                >
                                    <div>
                                        <h4>
                                            {tarefa.titulo}
                                        </h4>
                                        <p>{tarefa.descricao}</p>
                                    </div>
                                    <div>
                                        <button
                                            type='button'
                                            onClick={() => {
                                                funEditarTarefa({editar: true, tarefa: tarefa})
                                                props.abrirModal();
                                            }}
                                        >
                                            Editar
                                        </button>
                                    </div>

                                </li>
                                :
                                <></>
                            )
                        })
                    }

                </ul>
            </Container>
        </>
    )
}
