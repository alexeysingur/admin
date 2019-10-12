import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'initials'
})
export class InitialsPipe implements PipeTransform {
  transform(values: string[]): string {
    for (let value of values) {
      if (!value) {
        return;
      }
    }
    const arr = values.map(v => v[0]);
    return arr[0] + '. ' + arr[1] + '.';
  }
}
