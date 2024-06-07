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
  const [tasks, setTasks] = useState<ITasks[]>([])

  const { headers } = useContext(AuthContext)

  const abrirModalTarefa = () => setIsVisibleModalTarefa(true);
  const fecharModalTarefa = () => setIsVisibleModalTarefa(false);

  const abrirModalCategoria = () => setIsVisibleModalCategoria(true);
  const fecharModalCategoria = () => setIsVisibleModalCategoria(false);

  useEffect(() => {
    if (headers.headers) {
      fetchCategories();
      fetchTasks();
    }
  }, [headers]);

  const fetchCategories = useCallback(() => {
    axios.get("http://localhost:5000/api/category", headers)
      .then(res => setCategories(res.data))
      .catch(err => console.error(err));
  }, [headers]);

  const fetchTasks = useCallback(() => {
    axios.get("http://localhost:5000/api/task", headers)
      .then(res => setTasks(res.data))
      .catch(err => console.error(err))
  }, [headers])

  return (
    <>
      <Header abrirModalTarefas={abrirModalTarefa} abrirModalCategoria={abrirModalCategoria} />
      <ListTarefas abrirModal={abrirModalTarefa} tasks={tasks} fechTask={fetchTasks} />
      <TaskModal
        modalVisible={isVisibleModalTarefa}
        fecharModal={fecharModalTarefa}
        categories={categories}
        fechTasks={fetchTasks}
      />
      <CategoryModal
        modalVisible={isVisibleModalCategoria}
        fecharModal={fecharModalCategoria}
        fechCategory={() => fetchCategories}
      />
    </>
  );
};
