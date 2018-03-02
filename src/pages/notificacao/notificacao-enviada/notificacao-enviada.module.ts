import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { NotificacaoEnviadaPage } from './notificacao-enviada';

@NgModule({
  declarations: [
    NotificacaoEnviadaPage,
  ],
  imports: [
    IonicPageModule.forChild(NotificacaoEnviadaPage),
  ],
})
export class NotificacaoEnviadaPageModule {}
