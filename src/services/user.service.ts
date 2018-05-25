import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import 'rxjs/Rx';
import { Constants } from '../utils/constants';
import { Format } from '../utils/string.format';
import { HttpService } from './http.service';
import { Storage } from '@ionic/storage';
import * as decode from 'jwt-decode';
import { SqlserviceProvider } from '../providers/sqlservice/sqlservice';

@Injectable()
export class UserService {
  private url = Constants.URL;
  private user = Constants.user;
  private auth = Constants.auth;
  private version = Constants.VERSION;
  private stringFormat = Format.stringFormat;
  constructor(private httpService: HttpService, private storage: Storage, private sql:SqlserviceProvider) {}

  getUserInformation(email) : Observable<any>{
    return this.httpService.get(this.url + this.stringFormat(this.user.getInformation, email), {});
  }

  registerUser(param) : Observable<any>{
    return this.httpService.post(this.url + this.stringFormat(this.user.register), param);
  }

  updateUser(param) : Observable<any>{
    return this.httpService.put(this.url + this.stringFormat(this.user.update), param);
  }

  changePassword(passwords) : Observable<any> {
    return this.httpService.post(this.url + this.stringFormat(this.user.changePassword), passwords);
  }

  login(user) : Observable<any> {
    return this.httpService.post(this.url + this.stringFormat(this.auth.login), user);
  }

  resetPassword(email) : Observable<any> {
    return this.httpService.post(this.url + this.stringFormat(this.auth.resetPassword), email);
  }

  setToken(token, password) {
    return new Promise((resolve, reject) => {
      this.storage.set('token', token);
      this.setUser(decode(token), password).then( () => resolve());
    })
    
  }

  setUser(user, password){
    user.password = password;
    return new Promise((resolve, reject) => {      
      this.sql.setUser(user);
      this.storage.set('user', user).then(result => {
        resolve('ok');
      });      
    })    
  }

  getUser() {
    return new Promise((resolve, reject) => {
      this.storage.get('user').then(user => {
        resolve(user)
      });
    })
  }

  deleteUser() {
    this.sql.deleteUser();
  }
}