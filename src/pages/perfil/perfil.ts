import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, FabContainer } from 'ionic-angular';
import { MessageProvider } from '../../providers/message/message.provider'; 
import { LoginPage } from '../login/login';
import { App } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-perfil',
  templateUrl: 'perfil.html',
})
export class PerfilPage {

  veiculos = [{nome: 'Moto Azul', placa: 'ASD-0000', tipo: 'Moto'},
  {nome: 'Moto Azul', placa: 'ASD-0000', tipo: 'Moto'},
  {nome: 'Moto Azul', placa: 'ASD-0000', tipo: 'Moto'},
  {nome: 'Moto Azul', placa: 'ASD-0000', tipo: 'Moto'},
  {nome: 'Moto Azul', placa: 'ASD-0000', tipo: 'Moto'},
  {nome: 'Moto Azul', placa: 'ASD-0000', tipo: 'Moto'}]
  rateUser = 4.5;
  constructor(private  myApp: App, public navCtrl: NavController, public navParams: NavParams,
  private modalCtrl: ModalController, private msgProvider: MessageProvider) {
  }

  editarInfo(fab?: FabContainer) {
    this.closeFab(fab);
    const infoModal = this.modalCtrl.create('ModalInfo', {}, { enableBackdropDismiss: false });

    infoModal.present();
    infoModal.onWillDismiss(data => {
      if (data) this.msgProvider.showMessageToast('Informações alteradas com sucesso !!!', undefined, 'top');
    })
  }

  changePassword(fab?: FabContainer) {
    this.closeFab(fab);
    const passwordModal = this.modalCtrl.create('ModalPassword', {}, { enableBackdropDismiss: false});

    passwordModal.present();

    passwordModal.onWillDismiss(data => {
      if (data) this.msgProvider.showMessageToast('Senha alterada com sucesso !!!', undefined, 'top');
    })

  }

  openVeiculo() {
    const veiculoModal = this.modalCtrl.create('ModalVeiculo', {}, { enableBackdropDismiss: false});
    
    veiculoModal.present();

    veiculoModal.onWillDismiss(() => {
      this.msgProvider.showMessageToast('Veiculo alterado com sucesso !!!', undefined, 'top');
    })
  }

  addVeiculo() {

  }

  mainClick(fab?: FabContainer, event?: any) {
    if (event.target.className.indexOf('fab') === -1) this.closeFab(fab);
  }

  private closeFab(fab: FabContainer) {
    if (fab !== undefined) {
      fab.close();
    }
  }

  sair(fab?: FabContainer) {
    this.closeFab(fab);
    this.myApp.getRootNav().push(LoginPage, {});
  }



}
