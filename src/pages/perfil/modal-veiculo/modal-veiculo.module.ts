import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';

import { ModalVeiculo } from './modal-veiculo';

@NgModule({
  declarations: [
    ModalVeiculo,
  ],
  imports: [
    IonicPageModule.forChild(ModalVeiculo),
  ]
})
export class ModalVeiculoModule {}