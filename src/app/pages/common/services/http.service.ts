import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse, HttpParams } from '@angular/common/http';
 import { GlobalService } from './global.service';
 import { AuthService } from './auth.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import * as moment from 'moment';
@Injectable(
    {
        providedIn: 'root',
    }
)
export class HttpService {
    constructor(
        private http: HttpClient,
        private _globalService: GlobalService,
        private _authService: AuthService,
    ) { }
    private getHeaders(): HttpHeaders {
        return new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': this._globalService.getToken()
        });
    }
    private getHeadersWithoutBearer(): HttpHeaders {
        return new HttpHeaders({
            'Content-Type': 'application/json'
        });
    }
    public login(endpoint: any, model: any): any {
        return this.http.post(this._globalService.apiUrl + endpoint, model, { headers: this.getHeadersWithoutBearer() }
        ).pipe(map(response => {
            response = response;
            return response;
        }));
    }
    public post(model: any): any {
        return this.http.post(this._globalService.apiUrl, model, { headers: this.getHeaders() }
        ).pipe(map(response => {
            response = response;
            return response;
        }));
    }

    public get(endpoint: string): any {
        return this.http.get(this._globalService.apiUrl + endpoint, { headers: this.getHeaders() }
        ).pipe(map(response => {
            response = response;
            return response;
        }));
    }
    public patch(endpoint: string, model: any): any {
        return this.http.patch(this._globalService.apiUrl + endpoint, model, { headers: this.getHeaders() }
        ).pipe(map(response => {
            response = response;
            return response;
        }));
    }
    public put(endpoint: string, model: any): any {
        return this.http.put(this._globalService.apiUrl + endpoint, model, { headers: this.getHeaders() }
        ).pipe(map(response => {
            response = response;
            return response;
        }));
    }
    // public get( model: any, headerParams?: any): any {
    //     let params = new HttpParams();
    //     // params = params.append('page', '0');
    //     // params = params.append('size', '1000');
    //     return this.http.get(this._globalService.apiUrl,
    //         { headers: this.getHeaders() , params: params
    //             }
    //     ).pipe(map(response => {
    //         response = response;
    //         return response;
    //     }));
    // }
    public delete(endpoint: string): any {
        return this.http.delete(this._globalService.apiUrl + endpoint, { headers: this.getHeaders() }
        ).pipe(map(response => {
            response = response;
            return response;
        }));
    }
    getFromJson(endpoint: string): any {
        return this.http.get(endpoint);
    }

    private handleError(error: Response | any) {
        let errorMessage: any = {};
        if (error.status === 0) {
            errorMessage = {
                success: false,
                status: 0,
                data: 'Sorry, there was a connection error occurred. Please try again.',
            };
        } else {
            errorMessage = error.json();
        }
        return Observable.throw(errorMessage);
    }

    format(date: NgbDateStruct, format: string): string {
        if (!date) { return ''; }
        const mdt = moment([date.year, date.month - 1, date.day]);
        if (!mdt.isValid()) { return ''; }
        return mdt.format(format);
    }
    public handleErrorsFromServer(errors: any): any {
         let errorMessages = [];
        Object.entries(errors).forEach(
          ([key, value]) => // console.log(key, value)
            errorMessages.push(value)
        );
        return errorMessages;
      }
}
