import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';

import { ModalPassword } from './modal-password';

@NgModule({
  declarations: [
    ModalPassword,
  ],
  imports: [
    IonicPageModule.forChild(ModalPassword),
  ]
})
export class ModalPasswordModule {}