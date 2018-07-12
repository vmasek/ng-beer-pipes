// tslint:disable:max-classes-per-file
// tslint:disable:pipe-impure
// tslint:disable:no-any
import { CurrencyPipe, DatePipe, DecimalPipe } from '@angular/common';
import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';



@Pipe({
  name: 'safeHtml'
})
export class SafeHtmlPipe implements PipeTransform {

  constructor(private readonly sanitized: DomSanitizer) {}

  transform(value: string): SafeHtml {
    return this.sanitized.bypassSecurityTrustHtml(value);
  }
}



@Pipe({
  name: 'myDate',
})
export class MyDatePipe extends DatePipe implements PipeTransform {
  transform(timestamp: number): string {
    return super.transform(timestamp, 'dd/MM/yyyy');
  }
}



interface CurrencyModel {
  code: string;
  precision: number;
}

@Pipe({
  name: 'myCurrency'
})
export class MyCurrencyPipe extends CurrencyPipe implements PipeTransform {
  transform(value: number, {code = 'USD', precision = 2}: any & CurrencyModel = {}): string {
    console.log('waaa', value, code, precision);
    return super.transform(value / (10 ** precision), code, 'symbol', '1.');
  }
}



@Pipe({
  name: 'truncate'
})
export class TruncatePipe implements PipeTransform {
  transform(value: string, maxLen: number = 10, suffix: string = '…'): string {
    return `${value.slice(0, maxLen)}${suffix}`;
  }
}


/**
 * This converts calories to kilo calories
 */
@Pipe({
  name: 'convertCalories'
})
export class ConvertCaloriesPipe extends DecimalPipe implements PipeTransform {
  transform(cal: number, digitsInfo: string = '1.0-2'): string {
    return `${super.transform(cal / 100, digitsInfo)} kcal`;
  }
}
