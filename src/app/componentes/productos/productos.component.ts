import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Producto } from 'src/app/entidades/producto';
import { CarritoService } from 'src/app/services/carrito.service';
import { ProductosService } from 'src/app/services/productos.service';
import { UsuariosService } from 'src/app/services/usuarios.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CategoriasService } from 'src/app/services/categorias.service';
import { Categoria } from 'src/app/entidades/categoria';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.css']
})
export class ProductosComponent implements OnInit {
  public listaProductos: Producto[] = [];
  public filteredProducts: Producto[] = [];
  public categorias: Categoria[] = [];
  public userType: number = 1;
  public showModal = false;
  public selectedProduct = new Producto;
  public showDeleted = false;
  public showAdded = false;
  public productsFilter = "";
  public quantity = 0;

  selectedCategoryIds: number[] = [];

  constructor(private router: Router, public carritoService: CarritoService, private productosService: ProductosService, private usersService: UsuariosService, categoriasService: CategoriasService) {
    this.categorias = categoriasService.GetCategorias();
  }

  ngOnInit(): void {
    this.productosService.getProductos().subscribe(products => this.listaProductos = products);
    this.productosService.getProductos().subscribe(products => this.filteredProducts = products);
    this.userType = this.usersService.getLoggedUser().tipoUsuario
  }

  public CrearProducto() {
    this.router.navigate(["crearproducto"]);
  }

  public async EliminarProducto(producto: Producto) {
    this.selectedProduct = producto;
    this.showModal = true
  }

  public async Eliminar() {
    const respuesta = await this.productosService.deleteProducto(this.selectedProduct);
    if (respuesta != "Error") {
      this.closeModal();
      this.showDeleted = true;
      setTimeout(() => {
        this.showDeleted = false
      }, 2000);
    }
  }

  public ModificarProducto(value: any) {
    this.router.navigate(['/modificarproducto', value]);
  }

  public AddToCart(producto: Producto) {
    let cantidad = this.carritoService.AddToCart(producto);
    this.quantity = cantidad;
    this.showAdded = true;

    setTimeout(() => {
      this.showAdded = false
    }, 2000);
  }

  public closeAlert() {
    this.showDeleted = false;
  }

  public closeModal() {
    this.showModal = false;
  }

  public filterProducts() {
    this.filteredProducts = this.listaProductos.filter(x => x.nombre.toLowerCase().includes(this.productsFilter.toLowerCase()));

    if (this.selectedCategoryIds.length > 0)
      this.filteredProducts = this.filteredProducts.filter(x => this.selectedCategoryIds.includes(parseInt(x.categoria)));
    else
      this.filteredProducts = this.filteredProducts
  }

  toggleCategorySelection(categoryId: number) {
    const index = this.selectedCategoryIds.indexOf(categoryId);

    if (index !== -1) {
      this.selectedCategoryIds.splice(index, 1);

    } else {
      this.selectedCategoryIds.push(categoryId);
    }

    this.filterProducts();
  }

}
