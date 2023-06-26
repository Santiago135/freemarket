import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'showPrice'
})
export class ShowPricePipe implements PipeTransform {

  transform(value: any): any {
    if (value === null || value === undefined) {
      return '';
    }
    return Intl.NumberFormat("es-AR").format(value);;
  }

}
