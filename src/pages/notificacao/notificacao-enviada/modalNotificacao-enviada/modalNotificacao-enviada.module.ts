import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ModalNotificacaoEnviada } from './modalnotificacao-enviada';
import { Ionic2RatingModule } from 'ionic2-rating';

@NgModule({
  declarations: [
    ModalNotificacaoEnviada,
  ],
  imports: [
    IonicPageModule.forChild(ModalNotificacaoEnviada),
    Ionic2RatingModule
  ],
})
export class ModalNotificacaoEnviadaModule {}
