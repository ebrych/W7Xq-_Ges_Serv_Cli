import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { app_routing } from "./app.routes";
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { FormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
import { PanelComponent } from './components/panel/panel.component';
import { LoginGuard } from './login.guard';
import { NoLoginGuard } from './no-login.guard';
import { PersonalComponent } from './components/personal/personal.component';
import { LocalesComponent } from './components/locales/locales.component';
import { ServiciosComponent } from './components/servicios/servicios.component';
import { CargosComponent } from './components/cargos/cargos.component';
import { InsumosComponent } from './components/insumos/insumos.component';
import { ClientesComponent } from './components/clientes/clientes.component';
import { AsignaTareasComponent } from './components/asigna-tareas/asigna-tareas.component';
import { ReservasComponent } from './components/reservas/reservas.component';
import { AsistenciasComponent } from './components/asistencias/asistencias.component';
import { TrabajoComponent } from './components/trabajo/trabajo.component';
import { MarcacionComponent } from './components/marcacion/marcacion.component';
import { QRCodeModule } from 'angularx-qrcode';
import { RepoLocalComponent } from './components/repo-local/repo-local.component';
import { PaginaWebComponent } from './components/pagina-web/pagina-web.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    PanelComponent,
    PersonalComponent,
    LocalesComponent,
    ServiciosComponent,
    CargosComponent,
    InsumosComponent,
    ClientesComponent,
    AsignaTareasComponent,
    ReservasComponent,
    AsistenciasComponent,
    TrabajoComponent,
    MarcacionComponent,
    RepoLocalComponent,
    PaginaWebComponent
  ],
  imports: [
    BrowserModule,
    app_routing,
    FormsModule,
    HttpClientModule,
    QRCodeModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production })
  ],
  providers: [LoginGuard,NoLoginGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
