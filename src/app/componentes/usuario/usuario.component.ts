import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Usuario } from 'src/app/entidades/usuario';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.css']
})
export class UsuarioComponent {
  @Input("user")
    public usuario: Usuario;

  @Output()
  public Eliminar = new EventEmitter();

  EliminarUsuario(){
    this.Eliminar.emit();
  }
  
    constructor() {
      this.usuario = new Usuario();
    }
}
