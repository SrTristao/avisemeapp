import { Pipe, PipeTransform } from '@angular/core';

/**
 * Generated class for the ForReversePipe pipe.
 *
 * See https://angular.io/api/core/Pipe for more info on Angular Pipes.
 */
@Pipe({
  name: 'forReverse',
})
export class ForReversePipe implements PipeTransform {
  transform(value) {
    return value.slice().reverse();
  }
}
