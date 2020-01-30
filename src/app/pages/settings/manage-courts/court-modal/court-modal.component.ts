import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { GlobalConfig, ToastrService } from 'ngx-toastr';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HttpService } from 'src/app/pages/common/services/http.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-court-modal',
  templateUrl: './court-modal.component.html',
  styleUrls: ['./court-modal.component.scss']
})
export class CourtModalComponent implements OnInit {
  options: GlobalConfig;
  public cases: any;
  dataSet: any;
  role : any;
  public counties: any;
  public subcounties: any;
  public courts: any;
  public station;
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
    this.form = this.formBuilder.group({
      'courtname': ['', Validators.required],
      'courttype': ['', Validators.required],
      'county': ['', Validators.required],
      'subcounty': ['', Validators.required]
    });
  }

  ngOnInit() {
    this.getcourtTypes();
    this.getCounties();
    this.onChanges();
  }

  // public submitData(): void {
  //   console.log(this.form)
  //   this.loading = true;
  //   this.submitted = true;
  //   this.commandInterface = {
  //     request_type: 'addstationcell',
  //     client_type: {
  //       "useragentversion": "android kit kat",
  //       "useragent": "android"
  //     },
  //     session_data: {
  //       cellname: this.form.value.cellname,
  //       capacity: this.form.value.capacity,
  //       celltype: this.form.value.celltype,
  //       cellclass: this.form.value.cellclass,
  //     }
  //   };
  //   console.log(this.commandInterface);
  //   this._httpService.post(this.commandInterface)
  //     .subscribe(result => {
  //       if (result.status === 'success') {
  //         this.toastrService.success('Record created successfully!', 'Created Successfully!');
  //         this.activeModal.close('success');
  //       } else {
  //         // this.handleErrorsFromServer(result);
  //       }
  //     }, error => {
  //       /// this.errorMessages = error.error.error_messages;
  //       // this.submitted = false;
  //       // this.invalidLogin = true;
  //       // this.errorMessage = error['error']['message'];
  //     },
  //       complete => {
  //         this.loading = false;
  //       });
  // }

  closeModal() {
    this.activeModal.close('Modal Closed');
  }

  public submitData(): void {
    // this.activeModal.close('Modal Closed');
    console.log(this.form)
    this.loading = true;
    this.submitted = true;
    this.commandInterface = {
      request_type: 'createcourt',
      client_type: {
        "useragentversion": "android kit kat",
        "useragent": "android"
      },
      session_data: {
        name: this.form.value.courtname,
        courttypeid: this.form.value.courttype,
        countydetails: {county: this.form.value.county, subcounty: this.form.value.subcounty}
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

  private getcourtTypes(): any{
    this._httpService.get('getcourttypes').subscribe(
      result => {
        this.dataSet = result.data.courttypes;
        this.courts = this.dataSet;  
        console.log(this.courts);
    },
    (err: HttpErrorResponse) => {
      if (err.error instanceof Error) {
        console.log("Client-side error occured.");
      } else {
        console.log("Server-side error occured.");
      }
    });
  }

  onChanges(){
    this.form.get('county').valueChanges.subscribe(id => {
        this._httpService.get('counties?county=' + id ).subscribe(
          result => { this.dataSet = result.data.subcounties; 
             this.subcounties = this.dataSet;
      });

    })
}

  private getCounties(): any{
    this._httpService.get('counties').subscribe(
      result => {
        this.dataSet = result.data.counties; 
        this.counties = this.dataSet;
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
