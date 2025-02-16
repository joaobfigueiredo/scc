import { Cor } from "./Cor";

export type Cliente = {
    id: string;
    nomeCompleto: string;
    email: string;
    cpf: string;
    corPreferida: Cor;
  };