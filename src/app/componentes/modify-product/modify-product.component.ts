import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Categoria } from 'src/app/entidades/categoria';
import { Producto } from 'src/app/entidades/producto';
import { CategoriasService } from 'src/app/services/categorias.service';
import { ProductosService } from 'src/app/services/productos.service';

@Component({
  selector: 'app-modify-product',
  templateUrl: './modify-product.component.html',
  styleUrls: ['./modify-product.component.css']
})
export class ModifyProductComponent implements OnInit {
  public producto: Producto = new Producto();
  public categorias: Categoria[] = [];
  private productos: Producto[] = [];
  public errorMessage = "No pueden estar en blanco: ";
  public emptyMessage = "";
  public showEmptyMessage = false;
  public successMessage = false;
  public empties = "";
  public showError = false;
  public error = "";
  private id: string = "";

  constructor(categoriesService: CategoriasService, private route: ActivatedRoute, private productsService: ProductosService, private router: Router) {
    this.categorias = categoriesService.GetCategorias();
  }

  ngOnInit() {
    let itemId = this.route.snapshot.paramMap.get('idToModify');
    this.id = itemId != null ? itemId : "";
  
    this.productsService.getProductos().subscribe(products => {
      this.productos = products;
      let prod = this.productos.find(x => x.id == this.id);
      if (prod != undefined) {
        this.producto = prod;
      }
    });
  }

  public ModifyProducto() {
    this.showEmptyMessage = false;
    this.showError = false;
    if (!this.checkInputs()) {
      this.showEmptyMessage = true;
    }
    else {
      if (this.producto != undefined) {
        this.producto.precio = parseInt(this.producto.precio.toString().replace(/[^0-9]/g, ''));

        let respuesta = this.productsService.modifyProducto(this.producto);

        if (respuesta != "Error") {
          this.successMessage = true
        }
        else {
          this.showError = true;
        }
      }
      else {
        this.showError = true;
      }
    }
  }

  private checkInputs() {
    let isOk = true;
    this.empties = "";

    if (this.producto != undefined) {
      let name = this.producto.nombre;
      let cat = this.producto.categoria;
      let imagen = this.producto.imagen;
      let precio = this.producto.precio;
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
    }
    else {
      isOk = false;
    }

    this.emptyMessage = this.errorMessage + this.empties + "!";
    return isOk;
  }
}
