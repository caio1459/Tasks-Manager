export interface ICategory {
  id: number;
  description: string;
}

export interface IPropsModal {
  modalVisible: boolean;
  fecharModal: () => void;
}
