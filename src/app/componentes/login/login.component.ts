import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from '../../entidades/usuario';
import { LoggedUser } from '../../entidades/logged-user';
import { HttpClient } from '@angular/common/http';
import { AuthGuardGuard } from 'src/app/Guard/auth-guard.guard';
import { UsuariosService } from 'src/app/services/usuarios.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  usuarios: Usuario[] = [];
  public usuario: Usuario = new Usuario();
  public wrongUser = false;
  public ingresar() {
    let user = this.usuarios.find(x => x.nombre == this.usuario.nombre && x.password == this.usuario.password);
    if (user == undefined) {
      this.wrongUser = true;
    }
    else {
      sessionStorage.setItem('UsuarioLogueado', JSON.stringify(user));
      this.token.salida = true;
      this.route.navigateByUrl("home");
    }
  }

  clearMessage(){
    this.wrongUser = false;
  }

  constructor(public route: Router,
    public token: AuthGuardGuard, public http: HttpClient, private userServices: UsuariosService) {
  }
  ngOnInit(): void {
    this.userServices.getUsuarios().subscribe(usuarios => this.usuarios = usuarios)
  }

}