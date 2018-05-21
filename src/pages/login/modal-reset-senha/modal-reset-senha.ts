import { Component } from '@angular/core';
import { NavController, IonicPage, ViewController } from 'ionic-angular';
import { LoadingProvider } from '../../../providers/loading/loading.provider';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UserService } from '../../../services/user.service';
import { MessageProvider } from '../../../providers/message/message.provider';
@IonicPage()
@Component({
  selector: 'modal-reset-senha',
  templateUrl: 'modal-reset-senha.html'
})
export class ModalResetSenha {

  public formPassword: FormGroup;

  constructor(public navCtrl: NavController, private view: ViewController, 
  private loadingProvider: LoadingProvider, private userService: UserService,
  private messageProvider: MessageProvider) {
    this.formPassword = new FormGroup({
      email: new FormControl("", [Validators.required, Validators.email])
    });
  }

  enviar(email) {
    const loading = this.loadingProvider.loadingDefault('Enviando email...');
    loading.present();
    this.userService.resetPassword(email).subscribe(response => {
      loading.dismiss();
      this.view.dismiss();
    }, err => {
      loading.dismiss();
      this.messageProvider.showMessageToast('Email inválido.');
    })
  }

  cancelar() {
    this.view.dismiss();
  }

}
