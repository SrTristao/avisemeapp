import { Component } from '@angular/core';
import { NavController, IonicPage, ViewController } from 'ionic-angular';
import { LoadingProvider } from '../../../providers/loading/loading.provider';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@IonicPage()
@Component({
  selector: 'modal-info',
  templateUrl: 'modal-info.html'
})
export class ModalInfo {

  public formUsuario: FormGroup;

  constructor(public navCtrl: NavController, private view: ViewController, 
  private loadingProvider: LoadingProvider) {
    this.formUsuario = new FormGroup({
      id: new FormControl(""),
      nome: new FormControl("", [Validators.required, Validators.minLength(10)]),
      endereco: new FormControl("", [Validators.required, Validators.minLength(5)]),
      complemento: new FormControl(""),
      bairro: new FormControl("", [Validators.required, Validators.minLength(5)]),
      cep: new FormControl("", [Validators.required, Validators.minLength(3)]),
      cidade: new FormControl("", [Validators.required, Validators.minLength(3)]),
      uf: new FormControl("", [Validators.required, Validators.maxLength(2)]),
      email: new FormControl("", [Validators.required, Validators.email])
    });
  }

  enviar(usuario: any) {
    console.log(usuario);
    const loading = this.loadingProvider.loadingDefault('Atualizando informações...');
    loading.present();
    setTimeout(() => {
     // this.listaNotificacao.forEach(param => console.log(param));
      loading.dismiss();
      this.view.dismiss(usuario);
    }, 5000)
  }

  cancelar() {
    this.view.dismiss();
  }

}
