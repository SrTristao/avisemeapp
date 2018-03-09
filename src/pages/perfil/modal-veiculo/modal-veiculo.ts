import { Component } from '@angular/core';
import { NavController, IonicPage, ViewController } from 'ionic-angular';
import { LoadingProvider } from '../../../providers/loading/loading.provider';
@IonicPage()
@Component({
  selector: 'modal-veiculo',
  templateUrl: 'modal-veiculo.html'
})
export class ModalVeiculo {

  constructor(public navCtrl: NavController, private view: ViewController, 
  private loadingProvider: LoadingProvider) {
  }

  enviar() {
    const loading = this.loadingProvider.loadingDefault('Enviando notificação');
    loading.present();
    setTimeout(() => {
     // this.listaNotificacao.forEach(param => console.log(param));
      loading.dismiss();
      this.view.dismiss();
    }, 5000)
  }

}
