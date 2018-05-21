import { Component } from '@angular/core';
import { NavController, ModalController } from 'ionic-angular';
import { MessageProvider } from '../../providers/message/message.provider'; 
import { LoadingProvider } from '../../providers/loading/loading.provider';
import { VehicleService } from '../../services/vehicle.service';
import { UserService } from '../../services/user.service';
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  placa: String = '';
  user: any;
  constructor(public navCtrl: NavController, private modalCtrl: ModalController,
    private msgProvider: MessageProvider, private loadingProvider: LoadingProvider,
    private vehicleService: VehicleService, private userService: UserService) {
      this.userService.getUser().then(user => {
        this.user = user;
      })
    }

  presentOpcoesModal() {
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
        if (data !== 'cancelado')
          this.msgProvider.showMessageToast('Notificação enviada com sucesso !!!', undefined, 'top');
      })
    }, err => {
      loading.dismiss();
      this.msgProvider.showMessageToast(err.error.message);
    })   
  }

}
