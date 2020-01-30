import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpHeaders, HttpClient, HttpParams } from '@angular/common/http';
import { Observable ,  throwError } from 'rxjs';
// import { EnvironmentService } from '../../../shared/services/environment.service';

import { JwtService } from './jwt.service';
import { catchError } from 'rxjs/operators';

@Injectable()
export class ApiService {
  constructor(
    private http: HttpClient,
    private jwtService: JwtService,
    // private envUrl: EnvironmentService
  ) {}

  private formatErrors(error: any) {
    return  throwError(error.error);
  }


  // public getData(route: string) {
  //   return this.http.get(this.createCompleteRoute(route, this.envUrl.urlAddress));
  // }
 
  // public create(route: string, body) {
  //   return this.http.post(this.createCompleteRoute(route, this.envUrl.urlAddress), body, this.generateHeaders());
  // }
 
  // public update(route: string, body){
  //   return this.http.put(this.createCompleteRoute(route, this.envUrl.urlAddress), body, this.generateHeaders());
  // }
 
  // public delete(route: string){
  //   return this.http.delete(this.createCompleteRoute(route, this.envUrl.urlAddress));
  // }
 
  // private createCompleteRoute(route: string, envAddress: string) {
  //   return '${envAddress}/${route}';
  // }
 
  // private generateHeaders() {
  //   return {
  //     headers: new HttpHeaders({'Content-Type': 'application/json'})
  //   }
  // }
}
