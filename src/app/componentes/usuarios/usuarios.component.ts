import { DatePipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/entidades/usuario';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent {
  public listaUsuarios: Array<Usuario> = [];

  constructor(private router: Router, public http: HttpClient) {
    this.http.get<any>("http://localhost:7200/usuarios")
      .subscribe(data => {
        if (data.success) {
          console.log(data)
          this.listaUsuarios = data.data;
        }
        else{
          console.log(data.message)
        }
      });
  }

  public CrearUsuario(){
    this.router.navigate(["registrar"]);
  }
}
