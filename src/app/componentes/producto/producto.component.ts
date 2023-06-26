import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Producto } from 'src/app/entidades/producto';

@Component({
  selector: 'app-producto',
  templateUrl: './producto.component.html',
  styleUrls: ['./producto.component.css']
})
export class ProductoComponent {
  @Input("producto")
  public producto: Producto;

  @Output() 
  public eliminar =new  EventEmitter();

  @Output() 
  public modificar =new  EventEmitter();

  @Output()
  public addItemToCart = new EventEmitter();

  EliminarProducto(){
    this.eliminar.emit();
  }

  ModificarProducto(){
    this.modificar.emit();
  }

  AddToCart(){
    this.addItemToCart.emit();
  }
  
  constructor() {
    this.producto = new Producto();
  }
}
