import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'decToCm'
})
export class DecToCmPipe implements PipeTransform {

  transform(value: number): number {
    return value * 10;
  }
}
