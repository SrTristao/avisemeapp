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
    ServicesModule
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
    AndroidPermissions,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    LoadingProvider,
    MessageProvider,
    Geolocation
  ]
})
export class AppModule {}
