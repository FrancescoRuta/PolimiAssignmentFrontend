import { Produzione } from "./produzione";

export interface ImpiantoDiProduzione {
	id?: number;
	nome: string;
	produzioni?: Produzione[];
}