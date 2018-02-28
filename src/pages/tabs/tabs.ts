import { Component } from '@angular/core';

import { HomePage } from '../home/home';
import { PerfilPage } from '../perfil/perfil';
import { NotificacaoPage } from '../notificacao/notificacao';
@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = HomePage;
  tab2Root = NotificacaoPage;
  tab3Root = PerfilPage; 

  constructor() {

  }
}
