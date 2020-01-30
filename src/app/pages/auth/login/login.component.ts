import { Component, ViewEncapsulation, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormControl, AbstractControl, FormBuilder, Validators} from '@angular/forms';
import { CustomValidators } from 'ng2-validation';
import { GlobalService } from '../../common/services/global.service';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class LoginComponent implements OnInit {
  commandInterface: any;
  invalidLogin: boolean;
  form: FormGroup;
  submitted = false;
  returnUrl: string;
  error: {};
  loginError: string;
  errorMessage: any;

  constructor( 
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
    private globalService: GlobalService
    ) { }

  ngOnInit(): void {
    // reset login status
    this.authService.logout();

    // get return url from route parameters or default to ''
    this.returnUrl = this.route.snapshot.queryParamMap.get('returnUrl') || '';

    this.form = this.formBuilder.group({
      'email': ['', Validators.required],
      'password': ['', Validators.required]
    });
  }

  get inputControl(): { [p: string]: AbstractControl } {
    return this.form.controls;
  }

  public onSubmit():void {
        this.submitted = true;
        this.commandInterface = {
            request_type: 'userlogin',
            client_type:  {
                "useragentversion" : "android kit kat",
                "useragent" : "android"
        },
            session_data: {
                email: this.inputControl.email.value,
                password: this.inputControl.password.value
        }
    };
        this.authService.login(this.commandInterface)
        .subscribe(result => {
            if (result) {
              this.router.navigateByUrl(this.returnUrl);
            } else {
            
              this.submitted = false;
            }
          }, error => {
           
            this.submitted = false;
            // this.invalidLogin = true;
            this.errorMessage = error['error']['message'];
            
          });
      }
      register(): void {
        this.router.navigate(['/auth/register']);
      }

      forgotPassword(): void {
        this.router.navigate(['/auth/forgot-password']);
      }

      ngAfterViewInit(){
        document.getElementById('preloader').classList.add('hide');                 
  }

}
