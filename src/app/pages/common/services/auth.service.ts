import { map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
    providedIn: 'root',
})
export class AuthService {
    private loggedIn = false;
    public redirectURL = '';
    constructor(
        private _router: Router,
        private http: HttpClient,
    ) { }
    private getHeaders(): HttpHeaders {
        return new HttpHeaders({
            'Content-Type': 'application/json'
        });
    }
    public login(username, password) {
        const headers = new Headers();
        headers.append('Content-Type', 'application/json; charset=UTF-8');

        return this.http.post(
            //    this._globalService.apiHost + '/login',
            '',
            //   JSON.stringify({
            //    'LoginForm':
            //  {
            //    'username': username,
            //   'password': password
            //    },
            //  }),
            {
                "password": "string",
                "username": "string"
            },
            { headers: this.getHeaders() }
        ).pipe(
            map(response => {
                //console.log(data);
                if (response['status'] === 'success') {
                    localStorage.setItem('token', response['data']['auth_token']);
                    this.loggedIn = true;
                } else {
                    localStorage.removeItem('token');
                    this.loggedIn = false;
                }
                return response;
            }));
    }


    public logout(): void {
        localStorage.removeItem('token');
        this.loggedIn = false;
    }

    public getRoles(): any {

    }

    public getToken(): any {
        return localStorage.getItem('token');
    }

    private checkToken(): any {
        return !!localStorage.getItem('token');
    }

    public unauthorizedAccess(error: any): void {
        this.logout();
        this._router.navigate(['/login']);
    }

    public isLoggedIn(): any {
        const token = this.getToken();
        if (token !== null) {
            // return  this.loggedIn;
            return true;

        } else {
            return false;
        }
    }


    public getJWTValue(): any {
        const token = this.getToken();
        //  return this.jwtHelper.decodeToken(token);
    }

    private handleError(error: Response | any) {

        let errorMessage: any = {};
        // Connection error
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
}
