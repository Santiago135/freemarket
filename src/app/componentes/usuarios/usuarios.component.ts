import { DatePipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/entidades/usuario';
import { UsuariosService } from 'src/app/services/usuarios.service';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent {
  public listaUsuarios: Array<Usuario> = [];
  public usuario: Usuario = new Usuario();

  constructor(private router: Router, public http: HttpClient, private userService: UsuariosService) {
    this.usuario = userService.getLoggedUser();
    userService.getUsuarios().subscribe(usuarios => {
      this.listaUsuarios = usuarios;
    })
  }

  public CrearUsuario() {
    this.router.navigate(["registrar"]);
  }
}
