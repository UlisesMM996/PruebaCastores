import { Component } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  usuario:string = localStorage.getItem('email') ?? '--'
  rol: number =  Number(localStorage.getItem('rol'))
}
