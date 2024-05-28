import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { HomeComponent } from './pages/home/home.component';
import { UnauthorizedComponent } from './auth/unauthorized/unauthorized.component';
import { InventarioComponent } from './pages/inventario/inventario.component';
import { SalidasComponent } from './pages/salidas/salidas.component';
import { HistoricoComponent } from './pages/historico/historico.component';

const routes: Routes = [
  { path: 'login',  component: LoginComponent},
  { path: 'home',  component: HomeComponent},
  { path: 'unauthorized',  component: UnauthorizedComponent},
  { path: 'inventario',  component: InventarioComponent},
  { path: 'salidas',  component: SalidasComponent},
  { path: 'historico',  component: HistoricoComponent},
  { path: '**',  redirectTo: 'login'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
