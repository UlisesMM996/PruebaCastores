import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import * as feather from 'feather-icons';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './auth/login/login.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { HomeComponent } from './pages/home/home.component';
import { UnauthorizedComponent } from './auth/unauthorized/unauthorized.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { InventarioComponent } from './pages/inventario/inventario.component';
import { SalidasComponent } from './pages/salidas/salidas.component';
import { HistoricoComponent } from './pages/historico/historico.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    UnauthorizedComponent,
    NavbarComponent,
    InventarioComponent,
    SalidasComponent,
    HistoricoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
  ngAfterViewInit() {
    feather.replace();
  }
 }
