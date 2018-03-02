import { Component } from '@angular/core';
import { NavController, ModalController } from 'ionic-angular';
import { MessageProvider } from '../../providers/message/message.provider'; 
import { LoadingProvider } from '../../providers/loading/loading.provider';
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  placa: String = '';
  constructor(public navCtrl: NavController, private modalCtrl: ModalController,
    private msgProvider: MessageProvider, private loadingProvider: LoadingProvider) {}

  presentOpcoesModal() {
    const loading = this.loadingProvider.loadingDefault('Procurando placa...');
    loading.present();
    setTimeout(() => {
      loading.dismiss();
      // if (this.placa !== 'XXX-0000') {
      //   this.msgProvider.showMessageToast('Placa inválida ou inexistente', undefined, 'top');
      //   return;
      // }
      const opcoesModal = this.modalCtrl.create('ModalOpcoes');
      opcoesModal.present();
      opcoesModal.onWillDismiss(() => {
        this.msgProvider.showMessageToast('Notificação enviada com sucesso !!!', undefined, 'top');
      })
    }, 5000)
  }

}
