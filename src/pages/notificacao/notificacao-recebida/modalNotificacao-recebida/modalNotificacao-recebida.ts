import { Component, ElementRef, ViewChild} from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, ModalController } from 'ionic-angular';
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
  selector: 'modal-notificacao-recebida',
  templateUrl: 'modalNotificacao-recebida.html',
})
export class ModalNotificacaoRecebida {
  
  @ViewChild('map') mapElement: ElementRef;
  map: any;
  rateUser = 0;
  rateEvaluate = 0;
  evaluate = false;
  notification = {_id: 0, message: '', createdAt: '', board: '', lat_user_send: 0, lon_user_send: 0, user_send: 0};
  distance: 0;
  user: any;
  markers = [];
  constructor(public navCtrl: NavController, public navParams: NavParams, private view: ViewController,
    private msgProvider: MessageProvider, private loadingProvider: LoadingProvider,
    private notificationService: NotificationService, private userService: UserService,
    private geolocation: Geolocation, private scoreService: ScoreService,
    private modalCtrl: ModalController) {
      this.notification = this.navParams.get('notification'); 
      let loading = this.loadingProvider.loadingDefault('Carregando informações...');
      loading.present();    
      this.userService.getUser().then( user => {
        this.user = user;             
        this.initMap(loading);         
      });  
      this.scoreService.getByNotification(this.notification._id).subscribe(response => {                
        this.rateEvaluate = response.result.score;
      }, err => {})             
  }

  vote() {
    const notificationModal = this.modalCtrl.create('ModalVote', {rateEvaluate: this.rateEvaluate, notification: this.notification}, { enableBackdropDismiss: false });
    notificationModal.present();
  }

  initMap(loading) {
    this.geolocation.getCurrentPosition().then(geo => {
      this.map = new google.maps.Map(this.mapElement.nativeElement, {
        zoom: 11,
        center: new google.maps.LatLng(this.notification.lat_user_send, this.notification.lon_user_send)
      });
      this.addMarker(new google.maps.LatLng(this.notification.lat_user_send, this.notification.lon_user_send));
      this.addMarker(new google.maps.LatLng(geo.coords.latitude, geo.coords.longitude));

      this.map.setZoom(10);
      this.map.panTo(new google.maps.LatLng(this.notification.lat_user_send, this.notification.lon_user_send));

      new google.maps.DistanceMatrixService().getDistanceMatrix({
        origins: [new google.maps.LatLng(geo.coords.latitude, geo.coords.longitude)],
        destinations: [new google.maps.LatLng(this.notification.lat_user_send, this.notification.lon_user_send)],
        travelMode: 'WALKING'
      }, response => {
        this.distance = response.rows[0].elements[0].distance.text;
      })
      this.scoreService.getAll(this.notification.user_send).subscribe(response => {
        if (response.result.length > 0)
        this.rateUser = response.result.reduce((tot, score) => tot + score.score, 0)/response.result.length;
        loading.dismiss();
        this.msgProvider.showMessage('ALERTA', 'NUNCA VÁ AO SEU VEÍCULO SOZINHO(A).');  
      })      
    }, err => {
      this.msgProvider.showMessageToast('Ligue o GPS', undefined, 'top');
      loading.dismiss();
      this.view.dismiss();
    }).catch(err => {
      this.msgProvider.showMessageToast('Ligue o GPS', undefined, 'top');
      loading.dismiss();
      this.view.dismiss();
    });    
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
  }

  ionViewWillUnload() {
    this.rateEvaluate == 0 ? this.msgProvider.showMessage('AVISO', 'Nunca se esqueça de clicar na estrelinha ao topo da página e votar, isso ajuda na confiabilidade entre os usuários.') : '';
  }
  beautifulDate(data) {
    return moment(data).format('DD/MM/YYYY');
  }

  beautifulHours(hours) {
    return moment(hours).format('HH:mm');
  }
}
