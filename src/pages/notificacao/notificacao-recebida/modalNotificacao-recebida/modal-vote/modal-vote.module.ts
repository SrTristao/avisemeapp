import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ModalVote } from './modal-vote';
import { Ionic2RatingModule } from 'ionic2-rating';

@NgModule({
  declarations: [
    ModalVote,
  ],
  imports: [
    IonicPageModule.forChild(ModalVote),
    Ionic2RatingModule
  ],
})
export class ModalVoteModule {}
