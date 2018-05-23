import { Component, ElementRef, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';
import { MessageProvider } from '../../../providers/message/message.provider'; 
import { LoadingProvider } from '../../../providers/loading/loading.provider';
import { NotificationService } from '../../../services/notification.service';
import { UserService } from '../../../services/user.service';
import * as moment from 'moment';

declare var google: any;

@IonicPage()
@Component({
  selector: 'page-notificacao-recebida',
  templateUrl: 'notificacao-recebida.html',
})
export class NotificacaoRecebidaPage {
  @ViewChild('map') mapElement: ElementRef;
  map: any;
  notifications = [];
  user: any;
  constructor(public navCtrl: NavController, public navParams: NavParams, private modalCtrl: ModalController,
    private msgProvider: MessageProvider, private loadingProvider: LoadingProvider,
    private notificationService: NotificationService, private userService: UserService,
    private geolocation: Geolocation) {
      this.userService.getUser().then( user => {
        this.user = user;
      })
      this.initMap();
  }

  openNotification(notification) {
    const notificationModal = this.modalCtrl.create('ModalNotificacaoRecebida', {notification}, { enableBackdropDismiss: false });
    notificationModal.present();
  }

  initMap() {
    this.geolocation.getCurrentPosition().then(geo => {
      this.map = new google.maps.Map(this.mapElement.nativeElement, {
        zoom: 7,
        center: new google.maps.LatLng(geo.coords.latitude, geo.coords.longitude)
      });
    })    
  }

  ionViewDidEnter() {
    let loading = this.loadingProvider.loadingDefault('Carregando notificações recebidas...');
    loading.present();
    if (this.user === undefined) {
      this.userService.getUser().then( param => {
        let user: any = param;
        this.notificationService.getReceive(user._id).subscribe(response => {
          this.notifications = response.result;
          loading.dismiss();
        }, err => {
          this.msgProvider.showMessageToast(err.error.message);
          loading.dismiss();
        });
      });
    } else {
      this.notificationService.getReceive(this.user._id).subscribe(response => {
        this.notifications = response.result;
        loading.dismiss();
      }, err => {
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
