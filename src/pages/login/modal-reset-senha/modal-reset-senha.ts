import { Component } from '@angular/core';
import { NavController, IonicPage, ViewController } from 'ionic-angular';
import { LoadingProvider } from '../../../providers/loading/loading.provider';
import { FormGroup, FormControl, Validators } from '@angular/forms';
@IonicPage()
@Component({
  selector: 'modal-reset-senha',
  templateUrl: 'modal-reset-senha.html'
})
export class ModalResetSenha {

  public formPassword: FormGroup;

  constructor(public navCtrl: NavController, private view: ViewController, 
  private loadingProvider: LoadingProvider) {
    this.formPassword = new FormGroup({
      email: new FormControl("", [Validators.required, Validators.email])
    });
  }

  enviar() {
    const loading = this.loadingProvider.loadingDefault('Enviando email...');
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
