import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { NotificacaoRecebidaPage } from './notificacao-recebida/notificacao-recebida';
import { NotificacaoEnviadaPage } from './notificacao-enviada/notificacao-enviada';

@IonicPage()
@Component({
  selector: 'page-notificacao',
  templateUrl: 'notificacao.html',
})
export class NotificacaoPage {

  notificacaoRecebida = NotificacaoRecebidaPage;
  notificacaoEnviada = NotificacaoEnviadaPage;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }  

}
