import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { LoginPage } from '../login/login';
import { TabsPage } from '../tabs/tabs';

@IonicPage()
@Component({
  selector: 'page-cadastro',
  templateUrl: 'cadastro.html',
})
export class CadastroPage {

  public formRegistrar;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.formRegistrar = new FormGroup({
      nome_usuario: new FormControl("", Validators.compose([
        Validators.required
      ])),
      usuario_login: new FormControl("", Validators.compose([
        Validators.required        
      ])),
      senha: new FormControl("", Validators.compose([
        Validators.required        
      ])),
      data_nascimento: new FormControl("", Validators.compose([
        Validators.required,      
      ])),
      endereco: new FormControl("", Validators.compose([
        Validators.required        
      ])),
      end_numero: new FormControl("", Validators.compose([
        Validators.required        
      ])),
      cep: new FormControl("", Validators.compose([
        Validators.required        
      ])),
      complemento: new FormControl("", Validators.compose([
        Validators.required        
      ])),
      email: new FormControl("", Validators.compose([
        Validators.required        
      ]))
    })
  }

  registrar(usuario) {
    this.navCtrl.setRoot(TabsPage, {}, {animate: true, direction: 'forward'});
  }

  voltar() {
    this.navCtrl.setRoot(LoginPage, {}, {animate: true, direction: 'forward'});
  }


}
