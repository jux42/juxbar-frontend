import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'capitalizeFirst',
  standalone: true
})
export class CapitalizeFirstPipe implements PipeTransform {

  transform(value: string): string {
    if (!value) return value;
    let words = value.split(' ');
    return words.map((word, index) =>
      index === 0 ? word.charAt(0).toUpperCase() + word.slice(1).toLowerCase() : word.toLowerCase()
    ).join(' ');
  }

}
