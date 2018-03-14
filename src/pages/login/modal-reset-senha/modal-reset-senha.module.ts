import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';

import { ModalResetSenha } from './modal-reset-senha';

@NgModule({
  declarations: [
    ModalResetSenha,
  ],
  imports: [
    IonicPageModule.forChild(ModalResetSenha),
  ]
})
export class ModalResetSenhaModule {}