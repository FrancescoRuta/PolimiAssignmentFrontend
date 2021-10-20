import { Articolo } from "./articolo";
import { DistintaBase } from "./distinta-base";
import { ImpiantoDiProduzione } from "./impianto-di-produzione";
import { ScaricoDiProduzione } from "./scarico-di-produzione";

export interface Produzione {
	id?: number;
	qtaProdotta: number;
	inizioProduzione?: Date;
	fineProduzione?: Date;
	stato?: "NON_AVVIATA" | "AVVIATA" | "COMPLETATA";
	articoloProdotto?: Articolo;
	impiantoDiProduzione?: ImpiantoDiProduzione;
	distintaBase?: DistintaBase;
	scarichiDiProduzione?: ScaricoDiProduzione[];
}