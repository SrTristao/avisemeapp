import { NgModule } from '@angular/core';
import { MaskPlacaDirective } from './maskPlaca';
import { MaskYearDirective } from './year.directive';
@NgModule({
  declarations: [MaskPlacaDirective, MaskYearDirective],
  imports: [],
    providers: [],
  exports: [MaskPlacaDirective, MaskYearDirective]
})
export class DirectivesModule {}
