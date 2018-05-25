import { Component } from '@angular/core';
import { NavController, IonicPage, ViewController, NavParams, Form } from 'ionic-angular';
import { LoadingProvider } from '../../../providers/loading/loading.provider';
import { MessageProvider } from '../../../providers/message/message.provider';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { VehicleService } from '../../../services/vehicle.service';
@IonicPage()
@Component({
  selector: 'modal-veiculo',
  templateUrl: 'modal-veiculo.html'
})
export class ModalVeiculo {

  public formVeiculo: FormGroup;
  public vehicle = {
    board: '',
    model: '',
    name: '',
    type: '',
    state: '',
    year: '',
    color: '',
    brand: ''
  }
  constructor(public navCtrl: NavController, private view: ViewController, 
  private loadingProvider: LoadingProvider, private params: NavParams,
  private vehicleService: VehicleService, private messageProvider: MessageProvider) {
    const vehicle = params.get('vehicle');
    if (vehicle) this.vehicle = vehicle;
  }

  enviar(vehicle) {        
    const loading = this.loadingProvider.loadingDefault('Salvando veículo...');
    loading.present();
    if (vehicle._id !== undefined) {
      this.vehicleService.updateVehicle(vehicle).subscribe(response => {
        loading.dismiss();
        this.view.dismiss(vehicle);
      }, err => {
        loading.dismiss();
        this.messageProvider.showMessageToast(err.error.message, undefined, 'top');
      })
    } else {
      vehicle.id_user = this.params.get('id_user');
      console.log(vehicle);
      this.vehicleService.registerVehicle(vehicle).subscribe(response => {
        loading.dismiss();
        this.view.dismiss(response.result);
      }, err => {
        loading.dismiss();
        this.messageProvider.showMessageToast(err.error.message, undefined, 'top');
      })
    }
  }

  cancelar() {
    this.view.dismiss();
  }

}
