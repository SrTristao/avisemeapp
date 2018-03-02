import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';

import { ModalOpcoes } from './modal-opcoes';

@NgModule({
  declarations: [
    ModalOpcoes,
  ],
  imports: [
    IonicPageModule.forChild(ModalOpcoes),
  ]
})
export class ModalOpcoesModule {}