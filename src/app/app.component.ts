import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { LoginPage } from '../pages/login/login';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
import { AndroidPermissions } from '@ionic-native/android-permissions';
import { SqlserviceProvider } from '../providers/sqlservice/sqlservice';
import { UserService } from '../services/user.service';
import { timer } from 'rxjs/observable/timer';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = null;

  showSplash = true;
  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen,
    private androidPermissions: AndroidPermissions, private sql: SqlserviceProvider, private userService: UserService) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();    

      this.androidPermissions.checkPermission(this.androidPermissions.PERMISSION.GPS).then(
        result => console.log('Has permission?',result.hasPermission),
        err => this.androidPermissions.requestPermission(this.androidPermissions.PERMISSION.GPS)
      );     

      sql.createDataBase()
      .then( () => {
        sql.getUser().then( (data: any) => {
          if (!data) {
            this.openLogin();            
            return;
          }
          this.userService.login({email: data.email, password: data.password}).subscribe(result => {
            this.userService.setToken(result.token, data.password).then( () => {
              this.openHome();              
            })
          }, err => {            
            this.openLogin();            
          })
        })
      })

    });
  }

  openLogin() {
    this.rootPage = LoginPage;
    timer(2000).subscribe( () => this.showSplash = false);    
  }

  openHome() {
    this.rootPage = TabsPage;
    timer(2000).subscribe( () => this.showSplash = false);
  }
}
