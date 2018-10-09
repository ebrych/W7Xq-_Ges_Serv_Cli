import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from "./components/login/login.component";
import { PanelComponent } from "./components/panel/panel.component";
import { PersonalComponent } from "./components/personal/personal.component";
import { LocalesComponent } from "./components/locales/locales.component";
import { ServiciosComponent } from "./components/servicios/servicios.component";
import { CargosComponent } from "./components/cargos/cargos.component";
import { InsumosComponent } from "./components/insumos/insumos.component";
import { ClientesComponent } from "./components/clientes/clientes.component";
import { AsignaTareasComponent } from "./components/asigna-tareas/asigna-tareas.component";
import { ReservasComponent } from "./components/reservas/reservas.component";
import { AsistenciasComponent } from "./components/asistencias/asistencias.component";
import { TrabajoComponent } from "./components/trabajo/trabajo.component";
import { MarcacionComponent } from "./components/marcacion/marcacion.component";
import { RepoLocalComponent } from "./components/repo-local/repo-local.component";

import { LoginGuard } from './login.guard';
import { NoLoginGuard } from './no-login.guard';

const app_routes : Routes = [
   {path:'login', component : LoginComponent,canActivate:[NoLoginGuard]},
   {path:'panel', component : PanelComponent,canActivate:[LoginGuard]},
   {path:'personal', component : PersonalComponent ,canActivate:[LoginGuard]},
   {path:'locales', component : LocalesComponent,canActivate:[LoginGuard]},
   {path:'servicios', component : ServiciosComponent,canActivate:[LoginGuard]},
   {path:'cargos', component : CargosComponent,canActivate:[LoginGuard]},
   {path:'insumos', component : InsumosComponent,canActivate:[LoginGuard]},
   {path:'clientes', component : ClientesComponent,canActivate:[LoginGuard]},
   {path:'asigna-tareas', component : AsignaTareasComponent,canActivate:[LoginGuard]},
   {path:'reservas', component : ReservasComponent,canActivate:[LoginGuard]},
   {path:'asistencias', component : AsistenciasComponent,canActivate:[LoginGuard]},
   {path:'trabajo', component : TrabajoComponent,canActivate:[LoginGuard]},
   {path:'marcacion',component:MarcacionComponent,canActivate:[LoginGuard]},
   {path:'repo-local',component:RepoLocalComponent,canActivate:[LoginGuard]},
   {path:'**',pathMatch: 'full',redirectTo:'panel'}
];

export const app_routing = RouterModule.forRoot(app_routes);