import { useEffect, useState, useCallback, useContext } from "react";
import { Header } from "../../components/Header";
import { ListTarefas } from "../../components/ListTarefas";
import { TaskModal } from "../../components/TaskModal";
import { CategoryModal } from "../../components/CategoryModal";
import axios from 'axios';
import { ICategory, ITasks } from '../../interfaces/interfaces';
import { AuthContext } from "../../contexts/AuthContext";

export const Home = () => {
  const [isVisibleModalTarefa, setIsVisibleModalTarefa] = useState(false);
  const [isVisibleModalCategoria, setIsVisibleModalCategoria] = useState(false);
  const [categories, setCategories] = useState<ICategory[]>([]);
  const [tasks, setTasks] = useState<ITasks[]>([]);
  const [selectedTask, setSelectedTask] = useState<ITasks | undefined>(undefined);
  const [headersReady, setHeadersReady] = useState(false); //Estado para verificar se existe header

  const { headers } = useContext(AuthContext);

  const abrirModalTarefa = (task?: ITasks) => {
    setSelectedTask(task);
    setIsVisibleModalTarefa(true);
  };

  const fecharModalTarefa = () => {
    setSelectedTask(undefined);
    setIsVisibleModalTarefa(false);
  };

  const abrirModalCategoria = () => setIsVisibleModalCategoria(true);
  const fecharModalCategoria = () => setIsVisibleModalCategoria(false);

  const fetchCategories = useCallback(() => {
    if (headers.headers) {
      axios.get("http://localhost:5000/api/category", headers)
        .then(res => setCategories(res.data))
        .catch(err => console.error("Erro ao buscar categorias:", err));
    }
  }, [headers]);

  const fetchTasks = useCallback(() => {
    if (headers.headers) {
      axios.get("http://localhost:5000/api/task", headers)
        .then(res => setTasks(res.data))
        .catch(err => console.error("Erro ao buscar tarefas:", err));
    }
  }, [headers]);

  useEffect(() => {
    if (headers.headers && headers.headers.Authorization) {
      setHeadersReady(true);
    }
  }, [headers]);

  useEffect(() => {
    if (headersReady) {
      fetchCategories();
      fetchTasks();
    }
  }, [headersReady, fetchCategories, fetchTasks]);

  return (
    <>
      <Header abrirModalTarefas={() => abrirModalTarefa()} abrirModalCategoria={abrirModalCategoria} />
      <ListTarefas abrirModal={abrirModalTarefa} tasks={tasks} fechTask={fetchTasks} />
      <TaskModal
        modalVisible={isVisibleModalTarefa}
        fecharModal={fecharModalTarefa}
        task={selectedTask}
        categories={categories}
        fechTasks={fetchTasks}
      />
      <CategoryModal
        modalVisible={isVisibleModalCategoria}
        fecharModal={fecharModalCategoria}
        fechCategory={fetchCategories}
      />
    </>
  );
};
