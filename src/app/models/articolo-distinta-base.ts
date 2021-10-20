import { Articolo } from "./articolo";
import { DistintaBase } from "./distinta-base";

export interface ArticoloDistintaBase {
	id?: number;
	articolo?: Articolo;
	formula?: DistintaBase;
	qta: number;
}