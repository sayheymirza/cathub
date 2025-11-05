import { Pipe, PipeTransform } from '@angular/core';
import moment from 'jalali-moment';

@Pipe({
  name: 'date'
})
export class DatePipe implements PipeTransform {
  transform(value: string, format = 'jYYYY/jMM/jDD HH:mm'): string {
    return moment(value).locale('fa').format(format);
  }
}