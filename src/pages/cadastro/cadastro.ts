import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { LoginPage } from '../login/login';
import { TabsPage } from '../tabs/tabs';
import { UserService } from '../../services/user.service';
import { LoadingProvider } from '../../providers/loading/loading.provider';
import { MessageProvider } from '../../providers/message/message.provider';
import * as allStates from '../../states';
console.log(allStates);
@IonicPage()
@Component({
  selector: 'page-cadastro',
  templateUrl: 'cadastro.html',
})
export class CadastroPage {
  
  public states = allStates.default;
  
  public formRegistrar;

  constructor(public navCtrl: NavController, public navParams: NavParams, 
    private userService: UserService, private loadingProvider: LoadingProvider, 
    private messageProvider: MessageProvider) {
      console.log(this.states);
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
      ])),
      email: new FormControl("", Validators.compose([
        Validators.required, Validators.email      
      ])),
      neighborhood: new FormControl("", Validators.compose([
        Validators.required        
      ])),
      city: new FormControl("", Validators.compose([
        Validators.required       
      ])),
      state: new FormControl("", Validators.compose([
        Validators.required, Validators.maxLength(2), Validators.minLength(2)    
      ]))
    })
  }

  registrar(usuario) {
    const loading = this.loadingProvider.loadingDefault('Registrando usuário...');
    loading.present();
    console.log(usuario);
    this.userService.registerUser(usuario).subscribe(response => {                    
        this.userService.login({email: usuario.email, password: usuario.password}).subscribe(result => {
          this.userService.setToken(result.token, usuario.password).then(token => {
            loading.dismiss();
            this.navCtrl.setRoot(TabsPage, {}, {animate: true, direction: 'forward'});
          })
        }, err => {
          loading.dismiss();
          this.messageProvider.showMessageToast(err.error.message);
        })
    }, (err) => {
      loading.dismiss();
      this.messageProvider.showMessageToast(err.error.message);
    })
  }

  voltar() {
    this.navCtrl.setRoot(LoginPage, {}, {animate: true, direction: 'forward'});
  }


}
