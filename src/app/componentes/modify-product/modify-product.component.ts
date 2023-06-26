import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Categoria } from 'src/app/entidades/categoria';
import { Producto } from 'src/app/entidades/producto';
import { CategoriasService } from 'src/app/services/categorias.service';

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
  id:number = 0;

  constructor(categoriasService: CategoriasService, private route: ActivatedRoute){
    let itemId = this.route.snapshot.paramMap.get('idToModify');
    this.id = itemId != null ? parseInt(itemId) : 0;
    console.log(this.id)
    this.productos = JSON.parse(localStorage.getItem("productos")??"[]");
    let productToModify: Producto = this.productos.filter(x => x.id == this.id)[0];
    this.producto = productToModify;
    console.log(this.producto);
    console.log(productToModify);
    this.categorias = categoriasService.GetCategorias();
  }

  ngOnInit() {
    let itemId = this.route.snapshot.paramMap.get('idToModify');
    this.id = itemId != null ? parseInt(itemId) : 0;
  }

  public ModifyProducto(){
    if(!this.checkInputs()){
      alert(this.errorMessage + this.empties)
    }
    else{
      this.productos = this.productos.filter(x => x.id != this.id);
      let productosCount = this.productos.length;
      this.producto.id = productosCount + 1;
      this.producto.precio = parseInt(this.producto.precio.toString().replace(/[^0-9]/g, ''));
      this.productos.push(this.producto);
      
      localStorage.setItem("productos", JSON.stringify(this.productos));

      alert("Producto modificado con exito!");
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
