import { Component } from '@angular/core';
import { NavController, IonicPage, ViewController } from 'ionic-angular';
import { LoadingProvider } from '../../../providers/loading/loading.provider';
@IonicPage()
@Component({
  selector: 'modal-opcoes',
  templateUrl: 'modal-opcoes.html'
})
export class ModalOpcoes {

  listaNotificacao = [];
  constructor(public navCtrl: NavController, private view: ViewController, 
  private loadingProvider: LoadingProvider) {
  }

  cancelar() {
    this.view.dismiss('cancelado');
  }
  enviar() {
    const loading = this.loadingProvider.loadingDefault('Enviando notificação');
    loading.present();
    let message = '';
    this.listaNotificacao.forEach((param, index) => {
      if (index === 0) {
        message = param;
      } else {
        message = message + ', ' + param;
      }

      if(index === this.listaNotificacao.length-1) {
        loading.dismiss();
        this.view.dismiss(message);
      }
    });
  }

  changeCheckBox(param) {
    if (this.listaNotificacao.indexOf(param) > -1) {
      this.listaNotificacao = this.listaNotificacao.filter(notificacao => notificacao !== param)
      return;
    }

    this.listaNotificacao.push(param);
  }
}
