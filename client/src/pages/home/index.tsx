import { useEffect, useState, useCallback, useContext } from "react";
import { Header } from "../../components/Header";
import { ListTarefas } from "../../components/ListTarefas";
import { TarefasProvider } from "../../contexts/tarefaContext";
import { useNavigate } from "react-router-dom";
import Cookies from 'js-cookie';
import { TaskModal } from "../../components/TaskModal";
import { AuthContext } from "../../contexts/AuthContext";
import { CategoryModal } from "../../components/CategoryModal";
import axios from 'axios';
import { ICategory } from '../../interfaces/interfaces';

export const Home = () => {
  const [isVisibleModalTarefa, setIsVisibleModalTarefa] = useState(false);
  const [isVisibleModalCategoria, setIsVisibleModalCategoria] = useState(false);
  const [categories, setCategories] = useState<ICategory[]>([]);
  const navigate = useNavigate();
  const { headers } = useContext(AuthContext);

  const abrirModalTarefa = () => setIsVisibleModalTarefa(true);
  const fecharModalTarefa = () => setIsVisibleModalTarefa(false);

  const abrirModalCategoria = () => setIsVisibleModalCategoria(true);
  const fecharModalCategoria = () => setIsVisibleModalCategoria(false);

  const fetchCategories = useCallback(() => {
    axios.get("http://localhost:5000/api/category", headers)
      .then(res => setCategories(res.data))
      .catch(err => console.error(err));
  }, []);

  useEffect(() => {
    const token = Cookies.get("@tasks:token");
    if (!token) navigate('/');
    fetchCategories()
  }, []);

  return (
    <>
      <TarefasProvider>
        <Header abrirModalTarefas={abrirModalTarefa} abrirModalCategoria={abrirModalCategoria} />
        <ListTarefas abrirModal={abrirModalTarefa} />
        <TaskModal
          modalVisible={isVisibleModalTarefa}
          fecharModal={fecharModalTarefa}
          categories={categories}
        />
        <CategoryModal
          modalVisible={isVisibleModalCategoria}
          fecharModal={fecharModalCategoria}
          fechCategory={fetchCategories}
        />
      </TarefasProvider>
    </>
  );
};
