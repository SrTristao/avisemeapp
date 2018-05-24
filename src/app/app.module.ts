import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { Ionic2MaskDirective } from "ionic2-mask-directive";
import { MaskPlacaDirective } from '../directives/maskPlaca';
import { Ionic2RatingModule } from 'ionic2-rating';
import { IonicStorageModule  } from '@ionic/storage';
import { Geolocation } from '@ionic-native/geolocation';
import { Push } from "@ionic-native/push";
import { Diagnostic } from '@ionic-native/diagnostic';
import { AndroidPermissions } from '@ionic-native/android-permissions';
import { Firebase } from '@ionic-native/firebase';
import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { UUID } from 'angular2-uuid';
import { SQLite } from '@ionic-native/sqlite';
import { ServicesModule } from '../services/services.module';
import { HomePage } from '../pages/home/home';
import { PerfilPage } from '../pages/perfil/perfil';
import { NotificacaoPage } from '../pages/notificacao/notificacao';
import { TabsPage } from '../pages/tabs/tabs';
import { LoginPage } from '../pages/login/login';
import { CadastroPage } from '../pages/cadastro/cadastro';
import { NotificacaoRecebidaPage } from '../pages/notificacao/notificacao-recebida/notificacao-recebida';
import { NotificacaoEnviadaPage } from '../pages/notificacao/notificacao-enviada/notificacao-enviada'; 

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { LoadingProvider } from '../providers/loading/loading.provider';
import { MessageProvider } from '../providers/message/message.provider';
import { FcmProvider } from '../providers/fcm/fcm';
import { SqlserviceProvider } from '../providers/sqlservice/sqlservice';
const firebase = {
  apiKey: "AIzaSyBlXZy6vnmMc7_-5AFksR2KPF6BFelWf-4",
  authDomain: "geotracker-205001.firebaseapp.com",
  projectId:"geotracker-205001"
 }


@NgModule({
  declarations: [
    MyApp,
    HomePage,
    PerfilPage,
    NotificacaoPage,
    TabsPage,
    LoginPage,
    CadastroPage,
    MaskPlacaDirective,
    Ionic2MaskDirective,
    NotificacaoRecebidaPage,
    NotificacaoEnviadaPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot(),
    Ionic2RatingModule,
    ServicesModule,
    AngularFireModule.initializeApp(firebase), 
    AngularFirestoreModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    PerfilPage,
    NotificacaoPage,
    TabsPage,
    LoginPage,
    CadastroPage,
    NotificacaoRecebidaPage,
    NotificacaoEnviadaPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Push,
    Diagnostic,
    Firebase,
    SQLite,
    AndroidPermissions,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    LoadingProvider,
    MessageProvider,
    Geolocation,
    FcmProvider,
    UUID,
    SqlserviceProvider
  ]
})
export class AppModule {}
