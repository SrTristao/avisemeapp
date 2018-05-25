import { Component, ElementRef, ViewChild} from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { MessageProvider } from '../../../../../providers/message/message.provider'; 
import { LoadingProvider } from '../../../../../providers/loading/loading.provider';
import { ScoreService } from '../../../../../services/score.service';

@IonicPage()
@Component({
  selector: 'modal-vote',
  templateUrl: 'modal-vote.html',
})
export class ModalVote {
  rateEvaluate = 0;
  rateUser = 0;
  notification: any;
  constructor(public navCtrl: NavController, public navParams: NavParams, private view: ViewController,
    private msgProvider: MessageProvider, private loadingProvider: LoadingProvider,
    private scoreService: ScoreService) {
       this.rateEvaluate = this.rateUser = navParams.get('rateEvaluate');  
       this.notification = navParams.get('notification');     
  }

  onModelChange(value) {
    const btnCancelar = {
      text: 'Cancelar',
      role: 'cancel'
    }, btnConfirm = {
      text: 'Confirmar', 
      role: 'confirm',
      handler: () => {
        const loading = this.loadingProvider.loadingDefault(`Salvando pontuação...`);
        loading.present();
        this.scoreService.registerScore({
          id_notification: this.notification._id,
          id_user: this.notification.user_send,
          score: value
        }).subscribe(response => {                          
          loading.dismiss();
          this.msgProvider.showMessageToast(response.message);
          this.view.dismiss();
        }, err => {
          this.msgProvider.showMessageToast(err.error.message);
          loading.dismiss();
        })
      }
    }
    this.msgProvider.showMessageConfirm('Confirmar', `Deseja registrar ${value} estrela(s)?`, btnCancelar, btnConfirm);
  }

  closeModal() {
    this.view.dismiss();
  }
}
