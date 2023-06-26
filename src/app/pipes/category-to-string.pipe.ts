import { Pipe, PipeTransform } from '@angular/core';
import { CategoriasService } from '../services/categorias.service';
import { Categoria } from '../entidades/categoria';

@Pipe({
  name: 'categoryToString'
})
export class CategoryToStringPipe implements PipeTransform {
  private categorias: Categoria[] = [];
  transform(value: any): any {
    let categoriaEncontrada = this.categorias.filter((x: Categoria) => x.id == value)[0];
    let nombre: string = categoriaEncontrada ? categoriaEncontrada.nombre : '';
    return nombre;
  }

  constructor(categoriasService: CategoriasService) {
    this.categorias = categoriasService.GetCategorias();
  }
}
