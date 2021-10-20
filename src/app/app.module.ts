import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { MatDialogModule } from "@angular/material/dialog";
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { MatPaginatorModule } from "@angular/material/paginator";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { MatSortModule } from "@angular/material/sort";
import { MatTableModule } from "@angular/material/table";
import { MatDividerModule } from "@angular/material/divider";
import { MatTooltipModule } from "@angular/material/tooltip";
import { MatSelectModule } from "@angular/material/select";
import { MatTabsModule } from "@angular/material/tabs";
import { MatStepperModule } from "@angular/material/stepper";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { CdkTableModule } from '@angular/cdk/table';
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { ArticoliComponent } from './pages/articoli/articoli.component';
import { InserisciArticolo } from './pages/inserisci-articolo/inserisci-articolo.component';
import { LoginComponent } from './pages/login/login.component';
import { AuthenticationGuard } from "./authentication/authentication.guard";
import { AuthenticationService } from "./authentication/authentication.service";
import { MagazzinoComponent } from './pages/magazzino/magazzino.component';
import { ProduzioneComponent } from './pages/produzione/produzione.component';
import { TableComponent } from './components/table/table.component';
import { ColumnComponent } from './components/column/column.component';
import { ArticoloService } from "./services/articolo.service";
import { ModificaDistintaBaseComponent } from './dialogs/modifica-distinta-base/modifica-distinta-base.component';
import { InserisciArticoloDistintaBaseComponent } from './dialogs/inserisci-articolo-distinta-base/inserisci-articolo-distinta-base.component';
import { ArticoloDistintaBaseQtaComponent } from './dialogs/articolo-distinta-base-qta/articolo-distinta-base-qta.component';
import { GetObjectPropPipe } from './pipes/get-object-prop.pipe';
import { ModificaArticoloComponent } from './pages/modifica-articolo/modifica-articolo.component';
import { ArticoloFormComponent } from './page-part-components/articolo-form/articolo-form.component';
import { DeleteConfirmDialogComponent } from './dialogs/delete-confirm-dialog/delete-confirm-dialog.component';
import { ErrorDialogComponent } from './dialogs/error-dialog/error-dialog.component';
import { RettificaGiacenzaComponent } from './dialogs/rettifica-giacenza/rettifica-giacenza.component';
import { OrdiniDiProduzioneComponent } from './page-part-components/ordini-di-produzione/ordini-di-produzione.component';
import { ProduzioniInCorsoComponent } from './page-part-components/produzioni-in-corso/produzioni-in-corso.component';
import { ProduzioniEffettuateComponent } from './page-part-components/produzioni-effettuate/produzioni-effettuate.component';
import { ModificaImpiantoDiProduzioneComponent } from './dialogs/modifica-impianto-di-produzione/modifica-impianto-di-produzione.component';
import { ImpiantiDiProduzioneComponent } from './pages/impianti-di-produzione/impianti-di-produzione.component';
import { InserisciOrdineDiProduzioneComponent } from './pages/inserisci-ordine-di-produzione/inserisci-ordine-di-produzione.component';
import { AuthInterceptor } from "./authentication/auth.interceptor";
import { Http401Interceptor } from "./authentication/http-401.interceptor";
import { UtentiComponent } from './pages/utenti/utenti.component';
import { ModificaUtenteComponent } from './dialogs/modifica-utente/modifica-utente.component';
import { ModificaPasswordUtenteComponent } from './dialogs/modifica-password-utente/modifica-password-utente.component';
import { IndexComponent } from './pages/index/index.component';
import { ModificaPasswordUtenteCorrenteComponent } from './dialogs/modifica-password-utente-corrente/modifica-password-utente-corrente.component';
import { SelezionaArticoloComponent } from './page-part-components/seleziona-articolo/seleziona-articolo.component';
import { OrdineDiProduzioneModificaQta } from "./dialogs/ordine-di-produzione-modifica-qta/ordine-di-produzione-modifica-qta.component";
import { MovimentiDiMagazzinoComponent } from './pages/movimenti-di-magazzino/movimenti-di-magazzino.component';

@NgModule({
	declarations: [
		AppComponent,
		ArticoliComponent,
		InserisciArticolo,
		LoginComponent,
		MagazzinoComponent,
		ProduzioneComponent,
		TableComponent,
		ColumnComponent,
		ModificaDistintaBaseComponent,
		InserisciArticoloDistintaBaseComponent,
		ArticoloDistintaBaseQtaComponent,
		OrdineDiProduzioneModificaQta,
		GetObjectPropPipe,
		ModificaDistintaBaseComponent,
		ModificaArticoloComponent,
		ArticoloFormComponent,
		DeleteConfirmDialogComponent,
		ErrorDialogComponent,
		RettificaGiacenzaComponent,
		OrdiniDiProduzioneComponent,
		ProduzioniInCorsoComponent,
		ProduzioniEffettuateComponent,
		ModificaImpiantoDiProduzioneComponent,
		ImpiantiDiProduzioneComponent,
		InserisciOrdineDiProduzioneComponent,
		UtentiComponent,
		ModificaUtenteComponent,
		ModificaPasswordUtenteComponent,
		IndexComponent,
		ModificaPasswordUtenteCorrenteComponent,
  SelezionaArticoloComponent,
  MovimentiDiMagazzinoComponent,
	],
	imports: [
		BrowserModule,
		AppRoutingModule,
		BrowserAnimationsModule,
		HttpClientModule,
		MatButtonModule,
		MatInputModule,
		MatIconModule,
		FormsModule,
		MatCardModule,
		MatPaginatorModule,
		MatProgressSpinnerModule,
		MatSortModule,
		MatTableModule,
		CdkTableModule,
		MatDividerModule,
		MatTooltipModule,
		MatSelectModule,
		MatDialogModule,
		MatTabsModule,
		MatCheckboxModule,
		MatStepperModule
	],
	providers: [
		AuthenticationGuard,
		AuthenticationService,
		ArticoloService,
		{ provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
		{ provide: HTTP_INTERCEPTORS, useClass: Http401Interceptor, multi: true },
	],
	bootstrap: [AppComponent],
})
export class AppModule {}
