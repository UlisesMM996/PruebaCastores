import { Component } from '@angular/core';
import * as CryptoJS from 'crypto-js';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  constructor(private http: HttpClient, private router: Router,) { }
  public user: string = ''
  public password: string = ''

  encryptData(word: string){
    return CryptoJS.AES.encrypt(this.password, environment.crypto_key).toString()
  }

  login(){
    let pass = ''
    pass = this.encryptData(this.password)
    //La clave es Hola Mundo
    this.http.post('http://localhost:3000/login', {usuario: this.user, password: pass}).subscribe((element: any)=>{
      if(element.usuarioID){
        localStorage.setItem('usuarioid', element.usuarioID)
        localStorage.setItem('email', element.usuarioNombre)
        localStorage.setItem('token', element.token)
        localStorage.setItem('rol', element.rol)
        this.router.navigateByUrl('/home')
        return;
      }else{
        this.router.navigateByUrl('unauthorized')
      }
    })
  }
}
