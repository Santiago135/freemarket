import { Component, OnInit } from '@angular/core';
import { Categoria } from 'src/app/entidades/categoria';
import { Producto } from 'src/app/entidades/producto';
import { CategoriasService } from 'src/app/services/categorias.service';
import { ProductosService } from 'src/app/services/productos.service';

@Component({
  selector: 'app-crearproducto',
  templateUrl: './crearproducto.component.html',
  styleUrls: ['./crearproducto.component.css']
})
export class CrearproductoComponent implements OnInit {
  public producto: Producto = new Producto();
  public categorias: Categoria[] = [];
  private errorMessage = "No pueden estar en blanco: ";
  private empties = "";
  public error = "";
  public successMessage = false;
  public productos: Producto[] = [];

  constructor(categoriasService: CategoriasService, private productosService: ProductosService) {
    this.categorias = categoriasService.GetCategorias();
  }
  ngOnInit(): void {
    this.productosService.getProductos().subscribe(products => this.productos = products);
  }

  clearErrorMessage = () => {
    this.error = "";
  }

  clearSuccesMessage = () => {
    this.successMessage = false;
  }

  public async CrearProducto() {
    if (!this.checkInputs()) {
      this.error = this.errorMessage + this.empties
    }
    else {
      this.error = "";
      this.producto.precio = parseInt(this.producto.precio.toString().replace(/[^0-9]/g, ''));
      // let productosStorage: Producto[] = JSON.parse(localStorage.getItem("productos") ?? "[]");
      let productosCount = this.productos.length;
      this.producto.id = productosCount + 1;
      const response = await this.productosService.addProduct(this.producto);
      if (response != "Error") {
        this.successMessage = true;
      }
      // productosStorage.push(this.producto);

      // localStorage.setItem("productos", JSON.stringify(productosStorage));

      // alert("Producto creado con exito!");
    }
  }

  private checkInputs() {
    let name = this.producto.nombre;
    let cat = this.producto.categoria;
    let imagen = this.producto.imagen;
    let precio = this.producto.precio;

    let isOk = true;
    this.empties = "";

    if (name == "") {
      this.empties += "Nombre. ";
      isOk = false;
    }
    if (cat == "") {
      this.empties += "Categoria. ";
      isOk = false;
    }
    if (imagen == "") {
      this.empties += "Imagen. ";
      isOk = false;
    }
    if (precio < 1) {
      this.empties += "Precio. ";
      isOk = false;
    }

    return isOk;
  }
}
