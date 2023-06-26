import { Injectable } from '@angular/core';
import { Categoria } from '../entidades/categoria';

@Injectable({
  providedIn: 'root'
})
export class CategoriasService {
  private categorias: Categoria[] = [];

  GetCategorias(){
    return this.categorias;
  }

  constructor() {
    this.categorias.push({ id: 1, nombre: "Electrónica de consumo" });
    this.categorias.push({ id: 2, nombre: "Ropa y accesorios" });
    this.categorias.push({ id: 3, nombre: "Alimentos y bebidas" });
    this.categorias.push({ id: 4, nombre: "Belleza y cuidado personal" });
    this.categorias.push({ id: 5, nombre: "Hogar y jardín" });
    this.categorias.push({ id: 6, nombre: "Juguetes y juegos" });
    this.categorias.push({ id: 7, nombre: "Automóviles y accesorios" });
    this.categorias.push({ id: 8, nombre: "Deportes y actividades al aire libre" });
    this.categorias.push({ id: 9, nombre: "Libros y medios impresos" });
    this.categorias.push({ id: 10, nombre: "Salud y bienestar" });
    this.categorias.push({ id: 11, nombre: "Electrónica de oficina" });
    this.categorias.push({ id: 12, nombre: "Instrumentos musicales" });
    this.categorias.push({ id: 13, nombre: "Productos para mascotas" });
    this.categorias.push({ id: 14, nombre: "Muebles y decoración del hogar" });
    this.categorias.push({ id: 15, nombre: "Arte y artesanía" });
    this.categorias.push({ id: 16, nombre: "Joyería y relojes" });
    this.categorias.push({ id: 17, nombre: "Equipamiento deportivo" });
    this.categorias.push({ id: 18, nombre: "Herramientas y mejoras para el hogar" });
    this.categorias.push({ id: 19, nombre: "Suministros escolares y de oficina" });
    this.categorias.push({ id: 20, nombre: "Productos para bebés y niños" });
    this.categorias.push({ id: 21, nombre: "Productos de limpieza y organización" });
    this.categorias.push({ id: 22, nombre: "Suministros para fiestas y eventos" });
    this.categorias.push({ id: 23, nombre: "Viajes y accesorios de viaje" });
    this.categorias.push({ id: 24, nombre: "Suministros para mascotas" });
    this.categorias.push({ id: 25, nombre: "Otro" });
  }
}
