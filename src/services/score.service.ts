import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import 'rxjs/Rx';
import { Constants } from '../utils/constants';
import { Format } from '../utils/string.format';
import { HttpService } from './http.service';

@Injectable()
export class ScoreService {
  private url = Constants.URL;
  private score = Constants.score;
  private version = Constants.VERSION;
  private stringFormat = Format.stringFormat;
  constructor(private httpService: HttpService) {}

  getAll(id) : Observable<any>{
    return this.httpService.get(this.url + this.stringFormat(this.score.getAll, id), {});
  }

  registerScore(param) : Observable<any>{
    return this.httpService.post(this.url + this.stringFormat(this.score.register), param);
  }

}