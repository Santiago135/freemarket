import { Injectable } from '@angular/core';
import { Firestore, collection, addDoc } from '@angular/fire/firestore';
import { Producto } from '../entidades/producto';
import { Usuario } from '../entidades/usuario';

@Injectable({
  providedIn: 'root'
})
export class ProductosService {

  constructor(private firestore: Firestore) { }

  addProduct(product: Producto){
    const productRef = collection(this.firestore, "productos");
    return addDoc(productRef, {
      
    });
  }

  addUsuario(usuario: Usuario){
    const usuarioRef = collection(this.firestore, "usuarios");
    return addDoc(usuarioRef, usuario);
  }
}
