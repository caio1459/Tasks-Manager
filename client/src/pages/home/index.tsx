import { useEffect, useState, useCallback, useContext } from "react";
import { Header } from "../../components/Header";
import { ListTarefas } from "../../components/ListTarefas";
import { useNavigate } from "react-router-dom";
import Cookies from 'js-cookie';
import { TaskModal } from "../../components/TaskModal";
import { AuthContext } from "../../contexts/AuthContext";
import { CategoryModal } from "../../components/CategoryModal";
import axios from 'axios';
import { ICategory, ITasks } from '../../interfaces/interfaces';

export const Home = () => {
  const [isVisibleModalTarefa, setIsVisibleModalTarefa] = useState(false);
  const [isVisibleModalCategoria, setIsVisibleModalCategoria] = useState(false);

  const navigate = useNavigate();
  const { headers } = useContext(AuthContext);

  const [categories, setCategories] = useState<ICategory[]>([]);
  const [tasks, setTasks] = useState<ITasks[]>([])

  const abrirModalTarefa = () => setIsVisibleModalTarefa(true);
  const fecharModalTarefa = () => setIsVisibleModalTarefa(false);

  const abrirModalCategoria = () => setIsVisibleModalCategoria(true);
  const fecharModalCategoria = () => setIsVisibleModalCategoria(false);

  const fetchCategories = useCallback(() => {
    axios.get("http://localhost:5000/api/category", headers)
      .then(res => setCategories(res.data))
      .catch(err => console.error(err));
  }, []);

  const fetchTasks = useCallback(() => {
    axios.get("http://localhost:5000/api/task", headers)
      .then(res => setTasks(res.data))
      .catch(err => console.error(err))
  }, [])

  useEffect(() => {
    const token = Cookies.get("@tasks:token");
    if (!token) navigate('/');
    fetchCategories()
    fetchTasks()
  }, []);

  return (
    <>
      <Header abrirModalTarefas={abrirModalTarefa} abrirModalCategoria={abrirModalCategoria} />
      <ListTarefas abrirModal={abrirModalTarefa} tasks={tasks} />
      <TaskModal
        modalVisible={isVisibleModalTarefa}
        fecharModal={fecharModalTarefa}
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
