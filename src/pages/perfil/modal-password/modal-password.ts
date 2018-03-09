import { Component } from '@angular/core';
import { NavController, IonicPage, ViewController } from 'ionic-angular';
import { LoadingProvider } from '../../../providers/loading/loading.provider';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@IonicPage()
@Component({
  selector: 'modal-password',
  templateUrl: 'modal-password.html'
})
export class ModalPassword {

  formPassword: FormGroup;

  constructor(public navCtrl: NavController, private view: ViewController, 
  private loadingProvider: LoadingProvider) {
    this.formPassword = new FormGroup({
      senhaAtual: new FormControl("", [Validators.required, Validators.minLength(6)]),
      novaSenha: new FormControl("", [Validators.required, Validators.minLength(6)]),
      repNovaSenha: new FormControl("", [Validators.required, Validators.minLength(6), this.passwordConfirming.bind(this)])
    });
  }

  passwordConfirming(fieldControl: FormControl): { notEqual: boolean } {
    if (!this.formPassword || !this.formPassword.get("novaSenha") || !this.formPassword.get("novaSenha").value) {
      return null;
    }
    var confirmar = this.formPassword.get("novaSenha");
    if (confirmar) {
      if(fieldControl.value === confirmar.value) {
        return null;
      }
      return { notEqual: true }
    }
    return null;
  }

  enviar(password: any) {
    const loading = this.loadingProvider.loadingDefault('Atualizando senha...');
    loading.present();
    setTimeout(() => {
    //  this.listaNotificacao.forEach(param => console.log(param));
      loading.dismiss();
      this.view.dismiss(password);
    }, 5000)
  }

  cancelar() {
    this.view.dismiss();
  }

}
