import { Component } from '@angular/core';
import { CarritoItem } from 'src/app/entidades/carrito-item';
import { Producto } from 'src/app/entidades/producto';
import { CarritoService } from 'src/app/services/carrito.service';

@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.component.html',
  styleUrls: ['./carrito.component.css']
})
export class CarritoComponent {
  public carrito: CarritoItem[] = [];
  public total: number = 0;
  private totales: number[] = [];

  constructor(public carritoService: CarritoService) {
    this.UpdateCarritoPrice();
  }

  public AddItem(producto: Producto) {
    this.carritoService.AddToCart(producto);
    this.UpdateCarritoPrice();
  }

  public RemoveItem(producto: Producto) {
    this.carritoService.RemoveFromCart(producto.id);
    this.UpdateCarritoPrice();
  }

  private UpdateCarritoPrice() {
    this.carrito = this.carritoService.GetCarrito();
    this.totales = this.carrito.map(x => x.cantidad * x.producto.precio);
    this.total = this.totales.reduce((total, valor) => total + valor, 0);
  }
}