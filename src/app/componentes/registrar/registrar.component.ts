import { Component } from '@angular/core';
import { Usuario } from '../../entidades/usuario';
import { Router } from '@angular/router';
import { LengthcheckerDirective } from "../../directivas/lengthchecker.directive";
import { HttpClient } from '@angular/common/http';
import { CheckIfIsLogged } from 'src/app/generics/checkIfIsLogged';

@Component({
  selector: 'app-registrar',
  templateUrl: './registrar.component.html',
  styleUrls: ['./registrar.component.css']
})
export class RegistrarComponent {
  public usuario = new Usuario();
  public password2 = "";
  private errorMessage = "No puede estar en blanco: ";
  private empties = "";
  public registrar() {
    if(!this.checkInputs()){
      alert(this.errorMessage + this.empties)
    }
    else{
      this.http.post<any>("http://localhost:7200/register", this.usuario)
      .subscribe(data => {
        if (data.success) {
          alert("Usuario creado con exito!");
          if(!CheckIfIsLogged()){
            this.route.navigateByUrl("login");
          }
        }
        else {
          alert(data.message);
        }
      });
    }
  }

  private checkInputs(){
    let username = this.usuario.nombre;
    let direccion = this.usuario.direccion;
    let imagen = this.usuario.imagen;
    let dni = this.usuario.dni.toString();
    
    let isOk = true;
    this.empties = "";

    if(username == ""){
      this.empties += "Usuario. ";
      isOk = false;
    }
    if(direccion == ""){
      this.empties += "Direccion. ";
      isOk = false;
    }
    if(imagen == ""){
      this.empties += "Imagen. ";
      isOk = false;
    }
    if(!this.usuario.fechaNac){
      this.empties += "Fecha nacimiento. ";
      isOk = false;
    }
    if(dni == ""){
      this.empties += "Dni. ";
      isOk = false;
    }

    return isOk;
  }

  constructor(public route: Router, public http: HttpClient) {
  }

}