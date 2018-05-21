import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { LoginPage } from '../login/login';
import { TabsPage } from '../tabs/tabs';
import { UserService } from '../../services/user.service';
import { LoadingProvider } from '../../providers/loading/loading.provider';
import { MessageProvider } from '../../providers/message/message.provider';
@IonicPage()
@Component({
  selector: 'page-cadastro',
  templateUrl: 'cadastro.html',
})
export class CadastroPage {

  public formRegistrar;

  constructor(public navCtrl: NavController, public navParams: NavParams, 
    private userService: UserService, private loadingProvider: LoadingProvider, 
    private messageProvider: MessageProvider) {
    this.formRegistrar = new FormGroup({
      name: new FormControl("", Validators.compose([
        Validators.required
      ])),
      password: new FormControl("", Validators.compose([
        Validators.required        
      ])),
      dateofbirth: new FormControl("", Validators.compose([
        Validators.required,      
      ])),
      address: new FormControl("", Validators.compose([
        Validators.required        
      ])),
      postalCode: new FormControl("", Validators.compose([
        Validators.required        
      ])),
      complement: new FormControl("", Validators.compose([
        Validators.required        
      ])),
      email: new FormControl("", Validators.compose([
        Validators.required        
      ])),
      neighborhood: new FormControl("", Validators.compose([
        Validators.required        
      ])),
      city: new FormControl("", Validators.compose([
        Validators.required        
      ])),
      state: new FormControl("", Validators.compose([
        Validators.required        
      ]))
    })
  }

  registrar(usuario) {
    const loading = this.loadingProvider.loadingDefault('Registrando usuário...');
    loading.present();
    console.log(usuario);
    this.userService.registerUser(usuario).subscribe(response => {
      loading.dismiss();
      if(response.message === 'Usuário registrado com sucesso.') {
        this.navCtrl.setRoot(TabsPage, {}, {animate: true, direction: 'forward'});
      } else {
        this.messageProvider.showMessageToast(response.message);
      }
    }, (err) => {
      loading.dismiss();
      this.messageProvider.showMessageToast(err.error.message);
    })
  }

  voltar() {
    this.navCtrl.setRoot(LoginPage, {}, {animate: true, direction: 'forward'});
  }


}
