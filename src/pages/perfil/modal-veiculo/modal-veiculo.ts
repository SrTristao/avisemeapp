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

  constructor(public navCtrl: NavController, private view: ViewController, 
  private loadingProvider: LoadingProvider, private params: NavParams,
  private vehicleService: VehicleService, private messageProvider: MessageProvider) {
    const vehicle = params.get('vehicle');
    if (vehicle) {
      this.formVeiculo = new FormGroup({
        _id: new FormControl(vehicle._id),
        name: new FormControl(vehicle.name, [Validators.required, Validators.minLength(10)]),
        board: new FormControl(vehicle.board, [Validators.required, Validators.minLength(8), Validators.maxLength(8)]),
        type: new FormControl(vehicle.type, [Validators.required, Validators.minLength(4)]),
        brand: new FormControl(vehicle.brand, [Validators.required, Validators.minLength(3)]),
        year: new FormControl(vehicle.year, [Validators.required, Validators.minLength(4), Validators.maxLength(4), Validators.pattern(/[0-9]/g)]),
        model: new FormControl(vehicle.model, [Validators.required, Validators.maxLength(2)]),
        state: new FormControl(vehicle.state, [Validators.required, Validators.maxLength(2), Validators.minLength(2)]),
        color: new FormControl(vehicle.color, [Validators.required]),
        id_user: new FormControl(vehicle.id_user)
      });
    } else {
      const id_user = params.get('id_user');
      this.formVeiculo = new FormGroup({
        _id: new FormControl(''),
        name: new FormControl('', [Validators.required, Validators.minLength(10)]),
        board: new FormControl('', [Validators.required, Validators.minLength(8), Validators.maxLength(8)]),
        type: new FormControl('', [Validators.required, Validators.minLength(4)]),
        brand: new FormControl('', [Validators.required, Validators.minLength(3)]),
        year: new FormControl('', [Validators.required, Validators.minLength(4), Validators.maxLength(4), Validators.pattern(/[0-9]/g)]),
        model: new FormControl('', [Validators.required, Validators.maxLength(2)]),
        state: new FormControl('', [Validators.required, Validators.maxLength(2), Validators.minLength(2)]),
        color: new FormControl('', [Validators.required]),
        id_user: new FormControl(id_user)
      });
    }
  }

  enviar(vehicle) {
    const loading = this.loadingProvider.loadingDefault('Salvando veículo...');
    loading.present();
    if (vehicle._id !== '') {
      this.vehicleService.updateVehicle(vehicle).subscribe(response => {
        loading.dismiss();
        this.view.dismiss(vehicle);
      }, err => {
        loading.dismiss();
        this.messageProvider.showMessageToast(err.error.message, undefined, 'top');
      })
    } else {
      delete vehicle._id;
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
