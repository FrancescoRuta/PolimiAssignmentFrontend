import { ArticoloDistintaBase } from "./articolo-distinta-base";
import { ArticoloQtaUpdate } from "./articolo-qta-update";
import { DistintaBase } from "./distinta-base";
import { Produzione } from "./produzione";
import { ScaricoDiProduzione } from "./scarico-di-produzione";
import { UnitaDiMisura } from "./unita-di-misura";

export interface Articolo {
	id?: number;
	codice: string;
	descrizione: string;
	unitaDiMisura: UnitaDiMisura;
	qtaGiacenza?: number;
	descrizioneEstesa: string;
	distinteBase: DistintaBase[];
	articoloDistinteBase?: ArticoloDistintaBase[];
	qtaUpdates?: ArticoloQtaUpdate[];
	produzioni?: Produzione[];
	scarichiDiProduzione?: ScaricoDiProduzione[];
}