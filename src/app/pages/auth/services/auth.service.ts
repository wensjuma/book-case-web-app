
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { GlobalService } from '../../common/services/global.service';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public loggedIn: boolean = false;
  public redirectURL: string = '';
  errorData: {};
    isTokenExpired: any;
    _currentUser: any;

  constructor(
    private http: HttpClient,
    private _globalService: GlobalService,
    private toastService: ToastrService
    ) { 
      
  }

  redirectUrl: string;

 login(model : any): any {
    const headers = new HttpHeaders({
        'Content-Type': 'application/json',
    });
    return this.http.post(this._globalService.apiUrl , model)
    .pipe(map(result => {
      console.log(result);
     
      if (result && result['data']['auth_token']) {
        localStorage.setItem("userData",JSON.stringify(result))
        localStorage.setItem('token', result['data']['auth_token']);
        localStorage.setItem('rules', result['data']['rules']);
        return true;
      } else {
        localStorage.removeItem('token');
        localStorage.removeItem('userData');
        return false;
      }
    }));
  }
  

  isLoggedIn() {
    if (localStorage.getItem('token')||  localStorage.getItem('userData')) {
      return true;
    }
    return false;
  }

  getAuthorizationToken() {
    const currentUser = JSON.parse(localStorage.getItem('token'));
    return currentUser.token;
  }

  logout() {
    localStorage.removeItem('token'); localStorage.removeItem('userData');
   
    localStorage.removeItem('bailsData');localStorage.removeItem('caseDetails');localStorage.removeItem('arrested');localStorage.removeItem('arested');
    

  }

  get currentUser(): any {
    return this._currentUser;
  }

  get token(): string {
    return localStorage.getItem('token');
  }

  public isAuthenticated(): boolean {
    const token = this.token;
    if (token) {
      return !this.isTokenExpired(token);
    } else {
      this.toastService.error("Your session has Expired", "Error");
      
      return false;
      
    }
  }

  private getCounties(): any{
    return this.http.get(this._globalService.login + 'counties')
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {

      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {

      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(`Backend returned code ${error.status}, ` + `body was: ${error.error}`);
    }

    // return an observable with a user-facing error message
    this.errorData = {
      errorTitle: 'Oops! Request for document failed',
      errorDesc: 'Something bad happened. Please try again later.'
    };
    return throwError(this.errorData);
  }

}
