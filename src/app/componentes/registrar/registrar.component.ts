import { Component, OnInit } from '@angular/core';
import { Usuario } from '../../entidades/usuario';
import { Router } from '@angular/router';
import { LengthcheckerDirective } from "../../directivas/lengthchecker.directive";
import { HttpClient } from '@angular/common/http';
import { CheckIfIsLogged } from 'src/app/generics/checkIfIsLogged';
import { UsuariosService } from 'src/app/services/usuarios.service';

@Component({
  selector: 'app-registrar',
  templateUrl: './registrar.component.html',
  styleUrls: ['./registrar.component.css']
})
export class RegistrarComponent implements OnInit {
  usuarios: Usuario[] = [];
  loggedUser: Usuario = new Usuario();

  public usuario = new Usuario();
  public password2 = "";
  private errorMessage = "No puede estar en blanco: ";
  private empties = "";
  public showSuccess = false;

  public error = "";

  public clearErrorMessage = () => {
    this.error = "";
    this.showSuccess = false;
  }

  public async registrar() {
    if (!this.checkInputs()) {
      this.error = this.errorMessage + this.empties;
    }
    else {
      this.error = "";
      let usuarioExist = this.usuarios.find(x => x.nombre.toLowerCase() == this.usuario.nombre.toLowerCase());
      if (usuarioExist != undefined) {
        this.error = "Usuario existente";
      }
      else {
        this.error = "";
        const response = await this.userService.addUsuario(this.usuario);
        if(response != "Error"){
          this.showSuccess = true
        }
        else{
          this.error = "No se pudo crear el usuario, intente mas tarde";
        }
      }
    }
  }

  private checkInputs() {
    let username = this.usuario.nombre;
    let direccion = this.usuario.direccion;
    let imagen = this.usuario.imagen;
    let dni = this.usuario.dni.toString();

    let isOk = true;
    this.empties = "";

    if (username == "") {
      this.empties += "Usuario. ";
      isOk = false;
    }
    if (direccion == "") {
      this.empties += "Direccion. ";
      isOk = false;
    }
    if (imagen == "") {
      this.empties += "Imagen. ";
      isOk = false;
    }
    if (!this.usuario.fechaNac) {
      this.empties += "Fecha nacimiento. ";
      isOk = false;
    }
    if (dni == "") {
      this.empties += "Dni. ";
      isOk = false;
    }

    return isOk;
  }

  constructor(public http: HttpClient, private userService: UsuariosService, private route: Router) {
  }
  ngOnInit(): void {
    this.userService.getUsuarios().subscribe(users => this.usuarios = users);
    this.loggedUser = this.userService.getLoggedUser();
  }

}