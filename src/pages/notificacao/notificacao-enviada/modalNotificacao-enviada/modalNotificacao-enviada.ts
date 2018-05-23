import { Component, ElementRef, ViewChild} from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';
import { MessageProvider } from '../../../../providers/message/message.provider'; 
import { LoadingProvider } from '../../../../providers/loading/loading.provider';
import { NotificationService } from '../../../../services/notification.service';
import { UserService } from '../../../../services/user.service';
import { ScoreService } from '../../../../services/score.service';
import * as moment from 'moment';

declare var google: any;

@IonicPage()
@Component({
  selector: 'modal-notificacao-enviada',
  templateUrl: 'modalNotificacao-enviada.html',
})
export class ModalNotificacaoEnviada {
  
  @ViewChild('map') mapElement: ElementRef;
  map: any;
  rateUser = 0;
  notification = {_id: 0, message: '', createdAt: '', board: '', lat_user_send: 0, lon_user_send: 0};
  user: any;
  markers = [];
  constructor(public navCtrl: NavController, public navParams: NavParams, private view: ViewController,
    private msgProvider: MessageProvider, private loadingProvider: LoadingProvider,
    private notificationService: NotificationService, private userService: UserService,
    private geolocation: Geolocation, private scoreService: ScoreService) {
      this.notification = this.navParams.get('notification'); 
      this.userService.getUser().then( user => {
        this.user = user;        
        this.initMap();   
      });              
  }

  initMap() {
    this.map = new google.maps.Map(this.mapElement.nativeElement, {
      zoom: 11,
      center: new google.maps.LatLng(this.notification.lat_user_send, this.notification.lon_user_send)
    });
    this.addMarker(new google.maps.LatLng(this.notification.lat_user_send, this.notification.lon_user_send));
  }

  setMapOnAll(map) {
    for (var i = 0; i < this.markers.length; i++) {
      this.markers[i].setMap(map);
    }
  }
  
  clearMarkers() {
    this.setMapOnAll(null);
  }
  
  deleteMarkers() {
    this.clearMarkers();
    this.markers = [];
  }

  addMarker(location) {
    let marker = new google.maps.Marker({
      position: location,
      map: this.map
    });
    this.markers.push(marker);
  }

  closeModal() {
    this.view.dismiss();
  }

  ionViewDidEnter() {
    let loading = this.loadingProvider.loadingDefault('Carregando informações...');
    loading.present();       
    this.scoreService.getByNotification(this.notification._id).subscribe(response => {
      this.rateUser = response.result.score;
      loading.dismiss();
    }, err => {
      this.msgProvider.showMessageToast(err.error.message);
      loading.dismiss();
    })
  }

  beautifulDate(data) {
    return moment(data).format('DD/MM/YYYY');
  }

  beautifulHours(hours) {
    return moment(hours).format('HH:mm');
  }
}
