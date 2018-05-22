import { Component } from '@angular/core';
import { NavController, ModalController } from 'ionic-angular';
import { MessageProvider } from '../../providers/message/message.provider'; 
import { LoadingProvider } from '../../providers/loading/loading.provider';
import { VehicleService } from '../../services/vehicle.service';
import { UserService } from '../../services/user.service';
import { Geolocation } from '@ionic-native/geolocation';
import { Platform } from 'ionic-angular';
import { NotificationService } from '../../services/notification.service';
import { Diagnostic } from '@ionic-native/diagnostic';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  placa: String = '';
  user: any;
  constructor(public navCtrl: NavController, private modalCtrl: ModalController,
    private msgProvider: MessageProvider, private loadingProvider: LoadingProvider,
    private vehicleService: VehicleService, private userService: UserService,
    private geolocation: Geolocation, private platform: Platform,
    private notificationService: NotificationService,
    private diagnostic: Diagnostic) {
      this.userService.getUser().then(user => {
        this.user = user;
      });
    }

  verifyGPS() {
    this.diagnostic.isGpsLocationEnabled().then(locationEnable => {
      if (!locationEnable) {
        this.msgProvider.showMessageToast('GPS não habilitado.');
        return;
      } 
      this.diagnostic.isGpsLocationAvailable().then(locationAvailable => {
        if (!locationAvailable) {
          this.msgProvider.showMessageToast('GPS não habilitado.');
          return;
        }  
        this.sendMessage();
      }).catch(error => {
        this.msgProvider.showMessageToast('GPS não habilitado.')
      });
    }).catch(error => {
      this.msgProvider.showMessageToast('GPS não habilitado.')
    });
  }

  private sendMessage() {
    let notification = {
      board: this.placa,
      user_send: this.user._id,
      lat_user_send: 0,
      lon_user_send: 0,
      message: ''
    };
    const loading = this.loadingProvider.loadingDefault('Procurando placa...');
    loading.present();
    this.vehicleService.getVehicle(this.placa, this.user._id).subscribe(response => {
      loading.dismiss();
      if(!response.hasVehicle) {
        this.msgProvider.showMessageToast(response.message);
        return;
      }
      const opcoesModal = this.modalCtrl.create('ModalOpcoes', {}, { enableBackdropDismiss: false });
      opcoesModal.present();
      opcoesModal.onWillDismiss((data) => {
        if (data !== 'cancelado') {
            this.geolocation.getCurrentPosition().then(pos => {
              notification.lat_user_send = pos.coords.latitude;
              notification.lon_user_send = pos.coords.longitude;
              notification.message = data;
              this.notificationService.registerNotification(notification).subscribe(response => {
                this.msgProvider.showMessageToast('Notificação enviada com sucesso !!!', undefined, 'top');
                this.placa = '';
              })
            });            
        }
      })
    }, err => {
      loading.dismiss();
      this.msgProvider.showMessageToast(err.error.message);
    })   
  }
}
