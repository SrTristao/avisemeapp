import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http'
import { HttpService } from './http.service';
import { VehicleService } from './vehicle.service';
import { UserService } from './user.service';
import { NotificationService } from './notification.service';
import { ScoreService } from './score.service';
import { IonicStorageModule  } from '@ionic/storage';
@NgModule({
  declarations: [],
  imports: [HttpClientModule, IonicStorageModule.forRoot()],
    providers: [
        HttpService,
        VehicleService,
        UserService,
        NotificationService,
        ScoreService
    ],
  exports: [HttpClientModule]
})
export class ServicesModule {}
