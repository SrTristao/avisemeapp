import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import 'rxjs/Rx';
import { Constants } from '../utils/constants';
import { Format } from '../utils/string.format';
import { HttpService } from './http.service';

@Injectable()
export class VehicleService {
  private url = Constants.URL;
  private vehicle = Constants.vehicle;
  private version = Constants.VERSION;
  private stringFormat = Format.stringFormat;
  constructor(private httpService: HttpService) {}

  getAll(id_user) : Observable<any>{
    return this.httpService.get(this.url + this.stringFormat(this.vehicle.getAll, id_user), {});
  }

  registerVehicle(param) : Observable<any>{
    return this.httpService.post(this.url + this.stringFormat(this.vehicle.register), param);
  }

  updateVehicle(param) : Observable<any>{
    return this.httpService.put(this.url + this.stringFormat(this.vehicle.update), param);
  }

  deleteVehicle(id) : Observable<any>{
    return this.httpService.delete(this.url + this.stringFormat(this.vehicle.delete, id), {});
  }

  getVehicle(id, user_id) : Observable<any> {
    return this.httpService.get(this.url + this.stringFormat(this.vehicle.get, id, user_id), {});
  }

}