import { Articolo } from "./articolo";
import { Produzione } from "./produzione";

export interface ScaricoDiProduzione {
	id: number;
	qta: number;
	articolo: Articolo;
	produzione: Produzione;
}