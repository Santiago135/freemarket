import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Producto } from 'src/app/entidades/producto';
import { CarritoService } from 'src/app/services/carrito.service';
import { ProductosService } from 'src/app/services/productos.service';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.css']
})
export class ProductosComponent implements OnInit {
  public listaProductos: Producto[] = [];

  constructor(private router: Router, public carritoService: CarritoService, private productosService: ProductosService) {
  }

  ngOnInit(): void {
    this.productosService.getProductos().subscribe(products => this.listaProductos = products)
  }

  public CrearProducto() {
    this.router.navigate(["crearproducto"]);
  }

  public async EliminarProducto(producto: Producto) {
    if (confirm("Estas seguro de eliminar este producto?")) {
      const respuesta = await this.productosService.deleteProducto(producto);
      
      if(respuesta == "Error"){
        alert("Ocurrió un error, por favor intente más tarde")
      }
      else{
        alert("Producto eliminado!");
      }
    }
  }

  public ModificarProducto(value: any) {
    this.router.navigate(['/modificarproducto', value]);
  }

  public AddToCart(producto: Producto) {
    this.carritoService.AddToCart(producto);
  }
}
