import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'departmentRu',
  standalone: true,
})
export class DepartmentRuPipe implements PipeTransform {
  transform(value: string): string {
    const map: Record<string, string> = {
      Acting: 'Актёр',
      Directing: 'Режиссёр',
    };
    return map[value] ?? value;

  }
}
