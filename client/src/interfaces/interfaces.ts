export interface ICategory {
  cat_id: number;
  description: string;
}

export interface ITasks {
  task_id: number;
  title: string;
  description: string;
  category: ICategory;
}

export interface IPropsModal {
  modalVisible: boolean;
  fecharModal: () => void;
}
