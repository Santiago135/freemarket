import { Injectable, OnInit } from '@angular/core';
import { Firestore, addDoc, collection, collectionData } from '@angular/fire/firestore';
import { Usuario } from '../entidades/usuario';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {
  usuarios: Usuario[] = []
  constructor(private firestore: Firestore) { }

  addUsuario(usuario: Usuario) {
    
    try {
      const usuarioRef = collection(this.firestore, "usuarios");
      return addDoc(usuarioRef, {
        nombre: usuario.nombre,
        password: usuario.password,
        direccion: usuario.direccion,
        imagen: usuario.imagen,
        fechaNac: usuario.fechaNac,
        dni: usuario.dni,
        tipoUsuario: usuario.tipoUsuario
      });
    }
    catch {
      return "Error";
    }
  }

  getUsuarios(): Observable<Usuario[]> {
    const usuarioRef = collection(this.firestore, "usuarios");
    return collectionData(usuarioRef, { idField: "id" }) as Observable<Usuario[]>;
  }
}
