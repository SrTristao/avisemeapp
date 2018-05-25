import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DirectivesModule } from '../../../directives/directives.module';
import { ModalVeiculo } from './modal-veiculo';

@NgModule({
  declarations: [
    ModalVeiculo    
  ],
  imports: [
    IonicPageModule.forChild(ModalVeiculo),
    DirectivesModule
  ]
})
export class ModalVeiculoModule {}