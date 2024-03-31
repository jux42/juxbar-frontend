import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  standalone: true,
  name: 'highlightWords'
})
export class BoldWordsPipe implements PipeTransform {
  transform(value: string, wordsToBold: string[]): string {
    if (!value) return '';
    let replacedText = value;
    if (wordsToBold && wordsToBold.length) {
      wordsToBold.forEach(word => {
        const regExp = new RegExp(word, 'gi');
        replacedText = replacedText.replace(regExp, match => `<strong>${match}</strong>`);
      });
    }
    return replacedText;
  }
}
