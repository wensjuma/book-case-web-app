import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GlobalService {
  public apiUrl: string;
public login: string;

  constructor() { 

    this.apiUrl = 'http://10.20.2.59:9696/ob/api/';
  }

  public getUserPermissions(): any {
    const permissions = localStorage.getItem('permissions');
    return JSON.parse(permissions);
  }
  public getToken(): any {
    return localStorage.getItem('token');
  }

  client_type : { 
    "useragentversion" : "android kit kat",
     "useragent" : "android"
    }
}
