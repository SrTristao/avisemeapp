import { Component } from '@angular/core';
import { NavController, IonicPage, ViewController } from 'ionic-angular';
import { LoadingProvider } from '../../../providers/loading/loading.provider';
import { FormGroup, FormControl, Validators } from '@angular/forms';
@IonicPage()
@Component({
  selector: 'modal-veiculo',
  templateUrl: 'modal-veiculo.html'
})
export class ModalVeiculo {

  public formVeiculo: FormGroup;

  constructor(public navCtrl: NavController, private view: ViewController, 
  private loadingProvider: LoadingProvider) {
    this.formVeiculo = new FormGroup({
      id: new FormControl(""),
      nome: new FormControl("", [Validators.required, Validators.minLength(10)]),
      placa: new FormControl("", [Validators.required, Validators.minLength(8), Validators.maxLength(8)]),
      tipo: new FormControl("", [Validators.required, Validators.minLength(4)]),
      marca: new FormControl("", [Validators.required, Validators.minLength(3)]),
      ano: new FormControl("", [Validators.required, Validators.minLength(4), Validators.maxLength(4), Validators.pattern(/[0-9]/g)]),
      modelo: new FormControl("", [Validators.required, Validators.maxLength(2)]),
      uf: new FormControl("", [Validators.required, Validators.maxLength(2), Validators.minLength(2)])
    });
  }

  enviar() {
    const loading = this.loadingProvider.loadingDefault('Enviando notificação');
    loading.present();
    setTimeout(() => {
     // this.listaNotificacao.forEach(param => console.log(param));
      loading.dismiss();
      this.view.dismiss();
    }, 5000)
  }

  cancelar() {
    this.view.dismiss();
  }

}
