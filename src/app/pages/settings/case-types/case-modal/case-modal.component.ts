import { HttpService } from './../../../common/services/http.service';
import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormBuilder, AbstractControl, Validators } from '@angular/forms';
import { AuthService } from 'src/app/pages/auth/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-case-modal',
  templateUrl: './case-modal.component.html',
  styleUrls: ['./case-modal.component.scss']
})
export class CaseModalComponent implements OnInit {
  commandInterface: any;
  invalidLogin: boolean;
  form: FormGroup;
  submitted = false;
  returnUrl: string;
  error: {};
  loginError: string;
  errorMessage: any;
  loading: boolean = false;
  
  constructor(
    public activeModal: NgbActiveModal,
    private authService: AuthService,
    private router: Router,
    private formBuilder: FormBuilder,
    private _httpService: HttpService
  ) {
    this.createForm();
   }

   private createForm() {
    this.form = this.formBuilder.group({
      'name': ['', Validators.required],
    });
  }

  get inputControl(): { [p: string]: AbstractControl } {
    return this.form.controls;
  }

  public submitData() {
    this.submitted = true;
    this.loading = true;

    this.commandInterface = {
        request_type: 'createcasetype',
        client_type:  {
            "useragentversion" : "android kit kat",
            "useragent" : "android"
    },
        session_data: {
            name: this.inputControl.name.value,
    }
};
    this._httpService.post(this.commandInterface)
    .subscribe(result => {
        if (result) {
          console.log(result);
          //this.router.navigateByUrl(this.returnUrl);
        } else {
          this.submitted = false;
        }
      }, error => {
        this.submitted = false;
        this.loading= false;
        // this.invalidLogin = true;
        // this.errorMessage = error['error']['message'];
      });
    this.activeModal.close(this.form.value);
  }

  public onSubmit():void {

  }

  ngOnInit() {
  }

  closeModal() {
    this.activeModal.close('Modal Closed');
  }

}
