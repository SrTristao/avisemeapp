import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, FabContainer } from 'ionic-angular';
import { MessageProvider } from '../../providers/message/message.provider'; 
import { LoginPage } from '../login/login';
import { App } from 'ionic-angular';
import { UserService } from '../../services/user.service';
import { VehicleService } from '../../services/vehicle.service';
import { ScoreService } from '../../services/score.service';
import { LoadingProvider } from '../../providers/loading/loading.provider';
@IonicPage()
@Component({
  selector: 'page-perfil',
  templateUrl: 'perfil.html',
})
export class PerfilPage {
  user: any;
  vehicles = [];
  rateUser = 0;
  constructor(private  myApp: App, public navCtrl: NavController, public navParams: NavParams,
  private modalCtrl: ModalController, private msgProvider: MessageProvider,
  private userService: UserService, private vehicleService: VehicleService, 
  private scoreService: ScoreService, private loadingProvider: LoadingProvider) {}

  editarInfo(fab?: FabContainer) {
    this.closeFab(fab);
    const infoModal = this.modalCtrl.create('ModalInfo', {user: this.user}, { enableBackdropDismiss: false });

    infoModal.present();
    infoModal.onWillDismiss(data => {
      if (data) {
        this.user = data;
        this.userService.setUser(data);
      }
    })
  }

  changePassword(fab?: FabContainer) {
    this.closeFab(fab);
    const passwordModal = this.modalCtrl.create('ModalPassword', {user: this.user}, { enableBackdropDismiss: false});

    passwordModal.present();

    passwordModal.onWillDismiss(data => {
      if (data) this.msgProvider.showMessageToast('Senha alterada com sucesso !!!', undefined, 'top');
    })

  }

  openVeiculo(vehicle) {
    const veiculoModal = this.modalCtrl.create('ModalVeiculo', {vehicle}, { enableBackdropDismiss: false});
    
    veiculoModal.present();

    veiculoModal.onWillDismiss((data) => {
      if (data) {
        this.msgProvider.showMessageToast('Veículo alterado com sucesso !!!', undefined, 'top');
        this.vehicles = this.vehicles.map(vehicle => {
          if (vehicle._id === data._id) {
            vehicle.name = data.name;
            vehicle.board = data.board;
            vehicle.type = data.type;
            vehicle.brand = data.brand;
            vehicle.year = data.year;
            vehicle.model = data.model;
            vehicle.color = data.color;
            vehicle.state = data.state;
          }
          return vehicle;
        })
      }
      
    })
  }

  pressEvent(vehicle, index) {
    const btnCancelar = {
      text: 'Cancelar',
      role: 'cancel'
    }, btnConfirm = {
      text: 'Confirmar', 
      role: 'confirm',
      handler: () => {
        const loading = this.loadingProvider.loadingDefault('Deletando veículo.');
        loading.present();
        this.vehicleService.deleteVehicle(vehicle._id).subscribe(response => {
          this.vehicles.splice(index, 1);
          loading.dismiss();
          this.msgProvider.showMessageToast(response.message);
        }, err => {
          this.msgProvider.showMessageToast(err.error.message);
          loading.dismiss();
        })
      }
    }
    this.msgProvider.showMessageConfirm('Delete', `Deseja deletar o veículo ${vehicle.name}?`, btnCancelar, btnConfirm);
  }

  addVeiculo() {
    const veiculoModal = this.modalCtrl.create('ModalVeiculo', {id_user: this.user._id}, { enableBackdropDismiss: false});
    
    veiculoModal.present();

    veiculoModal.onWillDismiss((data) => {
      if(data) {
        this.msgProvider.showMessageToast('Veículo cadastrado com sucesso !!!', undefined, 'top');
        this.vehicles.push(data);
      }
    })
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

  ionViewDidEnter() {
    if (this.user._id !== undefined)
    this.scoreService.getAll(this.user._id).subscribe(response => {
      if (response.result.length > 0)
        this.rateUser = response.result.reduce((tot, score) => tot + score.score, 0)/response.result.length;
    })
  }

  ionViewDidLoad() {
    this.userService.getUser().then(user => {
      this.user = user;
      this.scoreService.getAll(this.user._id).subscribe(response => {
        if (response.result.length > 0)
          this.rateUser = response.result.reduce((tot, score) => tot + score.score, 0)/response.result.length;
      })
      this.vehicleService.getAll(this.user._id).subscribe(response => {
        this.vehicles = response.result;
      })
    });
  }

}
