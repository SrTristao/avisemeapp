import { Component } from '@angular/core';
import { NavController, IonicPage, ViewController, NavParams } from 'ionic-angular';
import { LoadingProvider } from '../../../providers/loading/loading.provider';
import { MessageProvider } from '../../../providers/message/message.provider';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UserService } from '../../../services/user.service';

@IonicPage()
@Component({
  selector: 'modal-password',
  templateUrl: 'modal-password.html'
})
export class ModalPassword {

  formPassword: FormGroup;

  constructor(public navCtrl: NavController, private view: ViewController, 
  private loadingProvider: LoadingProvider, private userService: UserService,
  private msgProvider: MessageProvider, private params: NavParams) {
    const user = this.params.get('user');
    this.formPassword = new FormGroup({
      password: new FormControl("", [Validators.required, Validators.minLength(6)]),
      newPassword: new FormControl("", [Validators.required, Validators.minLength(6)]),
      repNewPassword: new FormControl("", [Validators.required, Validators.minLength(6), this.passwordConfirming.bind(this)]),
      email: new FormControl(user.email)
    });
  }

  passwordConfirming(fieldControl: FormControl): { notEqual: boolean } {
    if (!this.formPassword || !this.formPassword.get("newPassword") || !this.formPassword.get("newPassword").value) {
      return null;
    }
    var confirmar = this.formPassword.get("newPassword");
    if (confirmar) {
      if(fieldControl.value === confirmar.value) {
        return null;
      }
      return { notEqual: true }
    }
    return null;
  }

  enviar(passwords) {
    const loading = this.loadingProvider.loadingDefault('Atualizando senha...');
    loading.present();
    this.userService.changePassword(passwords).subscribe(response => {
      this.userService.setToken(response.result, passwords.newPassword);
      this.msgProvider.showMessageToast(response.message);
      loading.dismiss();
      this.view.dismiss();
    }, err => {
      loading.dismiss();
      this.msgProvider.showMessageToast(err.error.message);
    })
  }

  cancelar() {
    this.view.dismiss();
  }

}
