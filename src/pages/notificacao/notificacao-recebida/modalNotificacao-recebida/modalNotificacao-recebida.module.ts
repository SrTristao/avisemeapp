import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ModalNotificacaoRecebida } from './modalnotificacao-recebida';
import { Ionic2RatingModule } from 'ionic2-rating';

@NgModule({
  declarations: [
    ModalNotificacaoRecebida,
  ],
  imports: [
    IonicPageModule.forChild(ModalNotificacaoRecebida),
    Ionic2RatingModule
  ],
})
export class ModalNotificacaoRecebidaModule {}
