import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from '../../entidades/usuario';
import { LoggedUser } from '../../entidades/logged-user';
import { HttpClient } from '@angular/common/http';
import { AuthGuardGuard } from 'src/app/Guard/auth-guard.guard';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  public usuario: Usuario = new Usuario();
  public ingresado = false;
  public ingresar() {
    this.http.post<any>("http://localhost:7200/login", this.usuario)
      .subscribe(data => {
        if(data.success){
          var usuario = data.data;
          sessionStorage.setItem('UsuarioLogueado', JSON.stringify(usuario));
          this.token.salida = true;
          this.route.navigateByUrl("home");
        }
        else{
          alert(data.message);
        }
      });
  }

constructor(public route: Router, 
  public token:AuthGuardGuard, public http:HttpClient) {
}

}