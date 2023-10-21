import { Injectable } from '@angular/core';
import { Producto } from '../entidades/producto';
import { CarritoItem } from '../entidades/carrito-item';

@Injectable({
  providedIn: 'root'
})
export class CarritoService {
  private carrito: CarritoItem[] = [];
  constructor() {
    this.carrito = <Array<CarritoItem>>JSON.parse(localStorage.getItem('carrito') ?? "[]");
  }

  public GetCarrito() {
    return this.carrito;
  }

  private GetItemCant(id: string) {
    return this.carrito.filter((x: CarritoItem) => x.producto.id == id)[0].cantidad;
  }

  private CheckIfItemExistsInCart(id: string) {
    return this.carrito.filter((x: CarritoItem) => x.producto.id == id);
  }

  public AddToCart(producto: Producto) {
    let itemIsInCart = this.CheckIfItemExistsInCart(producto.id);
    if (itemIsInCart.length > 0) {
      this.carrito.filter((x: CarritoItem) => x.producto.id == producto.id)[0].cantidad += 1;
    }
    else {
      let newProduct: CarritoItem = new CarritoItem();
      newProduct.cantidad = 1;
      newProduct.producto = producto;
      this.carrito.push(newProduct);
    }

    localStorage.setItem("carrito", JSON.stringify(this.carrito));
    return this.GetItemCant(producto.id);
  }

  public RemoveFromCart(productoId: string) {
    let itemCount = this.carrito.filter((x: CarritoItem) => x.producto.id == productoId)[0].cantidad;

    if (itemCount > 1) {
      this.carrito.filter((x: CarritoItem) => x.producto.id == productoId)[0].cantidad -= 1;
      localStorage.setItem("carrito", JSON.stringify(this.carrito));
    }
    else if (itemCount == 1) {
        let index = this.carrito.findIndex((x: CarritoItem) => x.producto.id === productoId);
        if (index !== -1) {
          this.carrito.splice(index, 1);
          localStorage.setItem("carrito", JSON.stringify(this.carrito));
      }
    }
  }

  public ClearCart() {
      this.carrito = [];
      localStorage.setItem("carrito", JSON.stringify(this.carrito));
  }
}
