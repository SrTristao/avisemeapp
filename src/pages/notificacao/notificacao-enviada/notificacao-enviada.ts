import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { MessageProvider } from '../../../providers/message/message.provider'; 
import { LoadingProvider } from '../../../providers/loading/loading.provider';
import { NotificationService } from '../../../services/notification.service';
import { UserService } from '../../../services/user.service';
import * as moment from 'moment';

@IonicPage()
@Component({
  selector: 'page-notificacao-enviada',
  templateUrl: 'notificacao-enviada.html',
})
export class NotificacaoEnviadaPage {

  notifications = [];
  user: any;
  constructor(public navCtrl: NavController, public navParams: NavParams, private modalCtrl: ModalController,
    private msgProvider: MessageProvider, private loadingProvider: LoadingProvider,
    private notificationService: NotificationService, private userService: UserService) {
      this.userService.getUser().then( user => {
        this.user = user;
      })
  }

  openNotification(notification) {
    const notificationModal = this.modalCtrl.create('ModalNotificacaoEnviada', {notification}, { enableBackdropDismiss: false });
    notificationModal.present();
  }

  ionViewDidEnter() {
    let loading = this.loadingProvider.loadingDefault('Carregando notificações enviadas...');
    loading.present();
    if (this.user === undefined) {
      this.userService.getUser().then( param => {
        let user: any = param;
        this.notificationService.getSend(user._id).subscribe(response => {
          this.notifications = response.result;
          loading.dismiss();
        }, err =>{
          this.msgProvider.showMessageToast(err.error.message);
          loading.dismiss();
        });
      });
    } else {
      this.notificationService.getSend(this.user._id).subscribe(response => {
        this.notifications = response.result;
        loading.dismiss();
      }, err =>{
        this.msgProvider.showMessageToast(err.error.message);
        loading.dismiss();
      });
    }
  }

  beautifulDate(data) {
    return moment(data).format('DD/MM/YYYY');
  }

  beautifulHours(hours) {
    return moment(hours).format('HH:mm');
  }
}
