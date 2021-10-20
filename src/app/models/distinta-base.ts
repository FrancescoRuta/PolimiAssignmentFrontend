import { Articolo } from "./articolo";
import { ArticoloDistintaBase } from "./articolo-distinta-base";

export interface DistintaBase {
	id?: number;
	articoloProdotto?: Articolo;
	descrizione: string;
	articoliDistintaBase: ArticoloDistintaBase[];
}