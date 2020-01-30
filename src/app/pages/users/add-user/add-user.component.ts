import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { HttpService } from '../../common/services/http.service';
import { ToastrService, GlobalConfig } from 'ngx-toastr';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss']
})
export class AddUserComponent implements OnInit {
  options: GlobalConfig;
  dataSet: any;
  role : any;
  public station: any;
  public errorMessages;
  public hasErrors = false;
  form: FormGroup;
  loading: boolean = false;
  submitted: boolean = true;
  commandInterface: any;
  constructor(public activeModal: NgbActiveModal,
    private formBuilder: FormBuilder,
    private _httpService: HttpService,
    private toastrService: ToastrService
  ) {
    this.options = this.toastrService.toastrConfig;
    const emailRegex = '^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$';
    this.form = this.formBuilder.group({
      'name': ['', Validators.required],
      'rolename': ['', Validators.required],
      'stationid': ['', Validators.required],
      'email': ['', Validators.compose([Validators.required, Validators.pattern(emailRegex)])],
      'phonenumber': ['', Validators.required],
      'nationalidnumber': ['', Validators.required]
    });
  }


  ngOnInit() {
    this.getStations();
    this.getallroles();
  }

  public submitData(): void {
    console.log(this.form)
    this.loading = true;
    this.submitted = true;
    this.commandInterface = {
      request_type: 'createuser',
      client_type: {
        "useragentversion": "android kit kat",
        "useragent": "android"
      },
      session_data: {
        name: this.form.value.name,
        rolename: this.form.value.rolename,
        stationid: this.form.value.stationid,
        email: this.form.value.email,
        phonenumber: this.form.value.phonenumber,
        nationalidnumber: this.form.value.nationalidnumber,
      }
    };
    console.log(this.commandInterface);
    this._httpService.post(this.commandInterface)
      .subscribe(result => {
        console.log(result);
        if (result.status === 'success') {
          this.toastrService.success('Record created successfully!', 'Created Successfully!');
          this.activeModal.close('success');
        } else {
          // this.handleErrorsFromServer(result);
        }
      }, error => {
        /// this.errorMessages = error.error.error_messages;
        // this.submitted = false;
        // this.invalidLogin = true;
        // this.errorMessage = error['error']['message'];
      },
        complete => {
          this.loading = false;
        });
  }

  public handleErrorsFromServer(response: any) {
    this.loading = false;
    this.hasErrors = true;
    this.errorMessages = [];
    Object.entries(response.response.error).forEach(
      ([key, value]) => // console.log(key, value)
        this.errorMessages.push(value)
    );
  }  

  closeModal() {
    this.activeModal.close('Modal Closed');
  }

  private getStations(): any{
    this._httpService.get('getallstations').subscribe(
      result => {
        this.dataSet = result.data.stations;
        this.station = this.dataSet;  
        console.log(this.station);
    },
    (err: HttpErrorResponse) => {
      if (err.error instanceof Error) {
        console.log("Client-side error occured.");
      } else {
        console.log("Server-side error occured.");
      }
    });
  }

  private getallroles(): any{
    this._httpService.get('allroles').subscribe(
      result => {
        this.dataSet = result.data;
        this.role = this.dataSet;  
        console.log(this.role);
    },
    (err: HttpErrorResponse) => {
      if (err.error instanceof Error) {
        console.log("Client-side error occured.");
      } else {
        console.log("Server-side error occured.");
      }
    });
  }

}
