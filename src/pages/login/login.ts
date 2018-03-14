import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController} from 'ionic-angular';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { TabsPage } from '../tabs/tabs';
import { CadastroPage } from '../cadastro/cadastro';
import { MessageProvider } from '../../providers/message/message.provider'; 

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  public formLogin;

  constructor(public navCtrl: NavController, public navParams: NavParams, private modalCtrl: ModalController,
    private msgProvider: MessageProvider) {
    this.formLogin = new FormGroup({
      email: new FormControl("", Validators.compose([
        Validators.required, Validators.email     
      ])),
      senha: new FormControl("", Validators.compose([
        Validators.required, Validators.minLength(6)
      ]))
    })
  }

  login(usuario) {
    this.navCtrl.setRoot(TabsPage);
  }

  registrar() {
    this.navCtrl.push(CadastroPage);
  }

  resetSenha() {
    const modalResetSenha = this.modalCtrl.create('ModalResetSenha', {}, { enableBackdropDismiss: false });

    modalResetSenha.present();

    modalResetSenha.onWillDismiss(() => {
      this.msgProvider.showMessageToast('Email enviado com sucesso !!!', undefined, 'top');
    })
  }

}