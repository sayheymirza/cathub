import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'size'
})
export class SizePipe implements PipeTransform {

  transform(value: number, precision: number = 0): string {
    if (value === 0 || value === null || value === undefined) {
      return '0 B';
    }

    if (value < 0) {
      return 'Invalid size';
    }

    const units = ['B', 'KB', 'MB', 'GB'];
    const k = 1024;

    let unitIndex = 0;
    let size = value;

    // Find the appropriate unit
    while (size >= k && unitIndex < units.length - 1) {
      size /= k;
      unitIndex++;
    }

    // Format the number
    const formattedSize = unitIndex === 0 ?
      size.toString() : // Don't show decimals for bytes
      size.toFixed(precision);

    return `${formattedSize} ${units[unitIndex]}`;
  }

}
