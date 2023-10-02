import { Component, OnInit } from '@angular/core';
import { Producto } from 'src/app/entidades/producto';
import { ProductosService } from 'src/app/services/productos.service';

@Component({
  selector: 'app-bienvenido',
  templateUrl: './bienvenido.component.html',
  styleUrls: ['./bienvenido.component.css']
})
export class BienvenidoComponent implements OnInit {
  productos: Producto[] = [];

  constructor(private productosService: ProductosService){}

  ngOnInit(): void {
    this.productosService.getProductos().subscribe(prods => this.productos = prods);
    this.productos.slice(0, 3);
  }

}
