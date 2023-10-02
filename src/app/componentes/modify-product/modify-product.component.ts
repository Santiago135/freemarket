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
  private errorMessage = "No pueden estar en blanco: ";
  private empties = "";
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
    if (!this.checkInputs()) {
      alert(this.errorMessage + this.empties)
    }
    else {
      if (this.producto != undefined) {
        this.producto.precio = parseInt(this.producto.precio.toString().replace(/[^0-9]/g, ''));

        let respuesta = this.productsService.modifyProducto(this.producto);

        if (respuesta != "Error") {
          alert("Producto modificado con exito!");
          this.router.navigate(['/productos']);
        }
        else {
          alert("Ocurrio un error, intente mas tarde");
        }
      }
      else {
        alert("Ocurrio un error, intente mas tarde");
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

    return isOk;
  }
}
