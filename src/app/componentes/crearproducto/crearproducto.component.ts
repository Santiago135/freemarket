import { Component } from '@angular/core';
import { Categoria } from 'src/app/entidades/categoria';
import { Producto } from 'src/app/entidades/producto';
import { CategoriasService } from 'src/app/services/categorias.service';

@Component({
  selector: 'app-crearproducto',
  templateUrl: './crearproducto.component.html',
  styleUrls: ['./crearproducto.component.css']
})
export class CrearproductoComponent {
  public producto: Producto = new Producto();
  public categorias: Categoria[] = [];
  private errorMessage = "No pueden estar en blanco: ";
  private empties = "";

  constructor(categoriasService: CategoriasService){
    this.categorias = categoriasService.GetCategorias();
  }

  public CrearProducto(){
    if(!this.checkInputs()){
      alert(this.errorMessage + this.empties)
    }
    else{
      this.producto.precio = parseInt(this.producto.precio.toString().replace(/[^0-9]/g, ''));
      let productosStorage: Producto[] = JSON.parse(localStorage.getItem("productos")??"[]");
      let productosCount = productosStorage.length;
      console.log(productosCount);
      this.producto.id = productosCount + 1;
      productosStorage.push(this.producto);
      
      localStorage.setItem("productos", JSON.stringify(productosStorage));

      alert("Producto creado con exito!");
    }
  }

  private checkInputs(){
    let name = this.producto.nombre;
    let cat = this.producto.categoria;
    let imagen = this.producto.imagen;
    let precio = this.producto.precio;
    
    let isOk = true;
    this.empties = "";

    if(name == ""){
      this.empties += "Nombre. ";
      isOk = false;
    }
    if(cat == ""){
      this.empties += "Categoria. ";
      isOk = false;
    }
    if(imagen == ""){
      this.empties += "Imagen. ";
      isOk = false;
    }
    if(precio < 1){
      this.empties += "Precio. ";
      isOk = false;
    }

    return isOk;
  }
}
