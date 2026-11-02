import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'duration',
})
export class DurationPipe implements PipeTransform {
  transform(value: number | undefined, ...args: unknown[]): string  {
    let result: string  = ''

    if (value == null || value <= 0) {
       result += '-';
       return result;
    }

    const hour = Math.floor(value / 60);
    const minute = value % 60;
    if (hour > 0) {
      result += `${hour} ч `;
    }
    if (minute > 0) {
      result += `${minute} мин`;
    }
    return result
  }
}
