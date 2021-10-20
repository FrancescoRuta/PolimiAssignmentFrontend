import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthenticationGuard } from './authentication/authentication.guard';
import { ArticoliComponent } from './pages/articoli/articoli.component';
import { ImpiantiDiProduzioneComponent } from './pages/impianti-di-produzione/impianti-di-produzione.component';
import { IndexComponent } from './pages/index/index.component';
import { InserisciArticolo } from './pages/inserisci-articolo/inserisci-articolo.component';
import { InserisciOrdineDiProduzioneComponent } from './pages/inserisci-ordine-di-produzione/inserisci-ordine-di-produzione.component';
import { LoginComponent } from './pages/login/login.component';
import { MagazzinoComponent } from './pages/magazzino/magazzino.component';
import { ModificaArticoloComponent } from './pages/modifica-articolo/modifica-articolo.component';
import { MovimentiDiMagazzinoComponent } from './pages/movimenti-di-magazzino/movimenti-di-magazzino.component';
import { ProduzioneComponent } from './pages/produzione/produzione.component';
import { UtentiComponent } from './pages/utenti/utenti.component';

const routes: Routes = [
	{ path: '', canActivateChild: [AuthenticationGuard], children: [
		{ path: '', redirectTo: '/index', pathMatch: 'full' },
		{ path: 'index', component: IndexComponent },
		{ path: 'articoli', children: [
			{ path: '', component: ArticoliComponent },
			{ path: 'inserisci', component: InserisciArticolo },
			{ path: 'modifica', component: ModificaArticoloComponent },
		] },
		{ path: 'magazzino', component: MagazzinoComponent },
		{ path: 'movimenti-di-magazzino', component: MovimentiDiMagazzinoComponent },
		{ path: 'produzione', children: [
			{ path: '', component: ProduzioneComponent },
			{ path: 'inserisci-ordine-di-produzione', component: InserisciOrdineDiProduzioneComponent },
		] },
		{ path: 'impianti-di-produzione', component: ImpiantiDiProduzioneComponent },
		{ path: 'utenti', component: UtentiComponent },
	]},
	{ path: 'login', component: LoginComponent },
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})
export class AppRoutingModule { }
