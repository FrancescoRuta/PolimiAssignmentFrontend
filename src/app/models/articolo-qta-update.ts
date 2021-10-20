import { Articolo } from "./articolo";

export interface ArticoloQtaUpdate {
	id: number;
	dateTime: Date;
	reason: string;
	qta: number;
	articolo: Articolo;
}