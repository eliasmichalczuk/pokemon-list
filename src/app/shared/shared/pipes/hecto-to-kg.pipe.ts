import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'hectoToKg'
})
export class HectoToKgPipe implements PipeTransform {

  transform(value: number): number {
    return value / 10;
  }
}
