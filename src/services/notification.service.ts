import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import 'rxjs/Rx';
import { Constants } from '../utils/constants';
import { Format } from '../utils/string.format';
import { HttpService } from './http.service';

@Injectable()
export class NotificationService {
  private url = Constants.URL;
  private notification = Constants.notification;
  private version = Constants.VERSION;
  private stringFormat = Format.stringFormat;

  constructor(private httpService: HttpService) { }

  getReceive(id_user) : Observable<any>{
    return this.httpService.get(this.url + this.stringFormat(this.notification.getReceive, id_user), {});
  }

  getSend(id_user) : Observable<any>{
    return this.httpService.get(this.url + this.stringFormat(this.notification.getSend, id_user), {});
  }

  registerNotification(data) : Observable<any>{
    return this.httpService.post(this.url + this.stringFormat(this.notification.register), data);
  }
}