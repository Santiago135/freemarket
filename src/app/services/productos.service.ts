import { Injectable } from '@angular/core';
import { Firestore, collection, addDoc, collectionData } from '@angular/fire/firestore';
import { Producto } from '../entidades/producto';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductosService {

  constructor(private firestore: Firestore) { }

  addProduct(product: Producto) {
    try {
      const productRef = collection(this.firestore, "productos");
      return addDoc(productRef, {
        id: product.id,
        nombre: product.nombre,
        precio: product.precio,
        categoria: product.categoria,
        imagen: product.imagen
      });
    } catch {
      return "Error";
    }
  }

  getProductos(): Observable<Producto[]> {
    const productosRef = collection(this.firestore, "productos");
    return collectionData(productosRef, { idField: "id" }) as Observable<Producto[]>;
  }
}
