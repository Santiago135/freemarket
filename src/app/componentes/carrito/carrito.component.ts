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
  public showModal = false;
  public selectedItem: Producto = new Producto();
  public showModalDeleteItem = false;

  constructor(public carritoService: CarritoService) {
    this.UpdateCarritoPrice();
  }

  public AddItem(producto: Producto) {
    this.carritoService.AddToCart(producto);
    this.UpdateCarritoPrice();
  }

  public AskRemoveItem(producto: Producto){
    this.selectedItem = producto;
    this.showModalDeleteItem = true;
  }

  public RemoveItem() {
    this.carritoService.RemoveFromCart(this.selectedItem.id);
    this.UpdateCarritoPrice();
    this.showModalDeleteItem = false;
  }

  private UpdateCarritoPrice() {
    this.carrito = this.carritoService.GetCarrito();
    this.totales = this.carrito.map(x => x.cantidad * x.producto.precio);
    this.total = this.totales.reduce((total, valor) => total + valor, 0);
  }

  public VaciarCarrito(){
    this.showModal = true;
  }
  
  public ClearCarrito(){
    this.carritoService.ClearCart();
    location.reload();
  }

  public closeModal(){
    this.showModal = false;
    this.showModalDeleteItem = false;
  }
}