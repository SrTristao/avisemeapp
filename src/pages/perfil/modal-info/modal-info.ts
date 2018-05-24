import { Component } from '@angular/core';
import { NavController, IonicPage, ViewController, NavParams } from 'ionic-angular';
import { LoadingProvider } from '../../../providers/loading/loading.provider';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UserService } from '../../../services/user.service';
import { MessageProvider } from '../../../providers/message/message.provider';
import * as allStates from '../../../states';

@IonicPage()
@Component({
  selector: 'modal-info',
  templateUrl: 'modal-info.html'
})
export class ModalInfo {

  public formUsuario: FormGroup;
  public states = allStates.default;
  
  constructor(public navCtrl: NavController, private view: ViewController, 
  private loadingProvider: LoadingProvider,  private userService: UserService,
  private messageProvider: MessageProvider, private params: NavParams) {
    const user = params.get('user');
    this.formUsuario = new FormGroup({
      name: new FormControl(user.name, Validators.compose([
        Validators.required
      ])),
      dateofbirth: new FormControl(user.dateofbirth, Validators.compose([
        Validators.required,      
      ])),
      address: new FormControl(user.address, Validators.compose([
        Validators.required        
      ])),
      postalCode: new FormControl(user.postalCode, Validators.compose([
        Validators.required        
      ])),
      complement: new FormControl(user.complement, Validators.compose([])),
      neighborhood: new FormControl(user.neighborhood, Validators.compose([
        Validators.required        
      ])),
      city: new FormControl(user.city, Validators.compose([
        Validators.required        
      ])),
      state: new FormControl(user.state, Validators.compose([
        Validators.required        
      ])),
      email: new FormControl(user.email, Validators.compose([])),
      password: new FormControl(user.password, Validators.compose([])),
      _id: new FormControl(user._id)
    });
  }

  enviar(usuario: any) {
    const loading = this.loadingProvider.loadingDefault('Atualizando informações...');
    loading.present();
    this.userService.updateUser(usuario).subscribe(response => {
      loading.dismiss();
      this.messageProvider.showMessageToast(response.message, undefined, 'top');
      this.view.dismiss(usuario);
    }, err => {
      loading.dismiss();
      this.messageProvider.showMessageToast(err.error.message, undefined, 'top');
    });
  }

  cancelar() {
    this.view.dismiss();
  }

}
