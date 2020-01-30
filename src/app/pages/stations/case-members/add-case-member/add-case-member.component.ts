import { Component, OnInit, Input } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { HttpService } from 'src/app/pages/common/services/http.service';
import { ToastrService, GlobalConfig } from 'ngx-toastr';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-add-case-member',
  templateUrl: './add-case-member.component.html',
  styleUrls: ['./add-case-member.component.scss']
})

export class AddCaseMemberComponent implements OnInit {
  @Input() data: any;
  options: GlobalConfig;
  public cases: any;
  dataSet: any;
  role: any;
  public stations;
  public errorMessages;
  public hasErrors = false;
  public subcounties: any;
  public counties: any;
  form: FormGroup;
  loading: boolean = false;
  submitted: boolean = false;
  commandInterface: any;
  caseMemberForm: any;
  defendantIDs: any[];
  ComplainantIDs: any[];
  complainantId: any;
  caseForm: any;

  constructor(public activeModal: NgbActiveModal,
    private formBuilder: FormBuilder,
    private _httpService: HttpService,
    private toastrService: ToastrService
  ) {
    console.log(this.data)
    this.defendantIDs = [];
    this.ComplainantIDs = [];

    const emailRegex = '^[a-z0-9]+(\.[_a-z0-9]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,15})$';
    this.caseMemberForm = this.formBuilder.group({

      'fullname': ['', Validators.required],
      'idnumber': ['', Validators.compose([
        Validators.required, Validators.minLength(6),
        Validators.maxLength(8), Validators.pattern('[0-9]+')
      ])],
      'gender': ['', Validators.required],
      'email': ['', Validators.compose([
        Validators.required,
        Validators.pattern(emailRegex)
      ])],
      'phone': ['', Validators.compose([
        Validators.required,
        // Validators.pattern('/^\+?\d{1,3}[- ]?\d{3}[- ]?\d{5}$/')
      ])],
      'age': [''],
      'county': [''],
      'subcounty': [''],
      'address': [''],

    });
    this.caseForm = this.formBuilder.group({
      'casetype': ['', Validators.required],
    });

  }


  ngOnInit() {

    this.getStations();
    this.getallroles();
    this.getCounties()
    this.onvalChanges();
    this.getCases();


  }
  public createCaseMember(){
  this.commandInterface = {
    request_type: 'addcasemember',
    client_type: {
      "useragentversion": "android kit kat",
      "useragent": "android"
    },
    session_data: {
      name: this.caseMemberForm.value.fullname,
      nationalidnumber: this.caseMemberForm.value.idnumber,
      phonenumber: this.caseMemberForm.value.phone,
      age: this.caseMemberForm.value.age,
      gender: this.caseMemberForm.value.gender,
      email: this.caseMemberForm.value.email,
      countydetails: { 'county': 'nairobi', 'subcounty': 'embakasi' }
    }
  };
  this._httpService.post(this.commandInterface)
    .subscribe(result => {
      this.complainantId = result.data.id;
      console.log(this.complainantId)
      return this.defendantIDs.push(this.complainantId);
      //console.log(this.complainantArray)
    }, error => {
    },
      complete => {
        this.addToCase()
        
      });
    }
    addToCase(){
      this.commandInterface = {
        request_type: 'addcasemember',
        client_type: {
          "useragentversion": "android kit kat",
          "useragent": "android"
        },
        session_data:{
          casetype: this.caseForm.value.casetype,
        }
     
    }
  }

  // public submitData(): void {

  //   console.log('dream')
  //   this.loading = true;
  //   this.submitted = true;
  //   this.commandInterface = {
  //     request_type: 'addcasemember',
  //     client_type: {
  //       "useragentversion": "android kit kat",
  //       "useragent": "android"
  //     },
  //     session_data: {
  //       name: this.form.value.fullname,
  //       nationalidnumber: this.form.value.idnumber,
  //       phonenumber: this.form.value.phone,
  //       age: this.form.value.age,
  //       gender: this.form.value.gender,
  //       email: this.form.value.email,
  //       countydetails: { 'county': 'nairobi', 'subcounty': 'embakasi' }
  //     }
  //   };
  //   this._httpService.post(this.commandInterface)
  //     .subscribe(result => {
  //       result = result;
  //       console.log(result)
  //       this.closeModal()
  //       //console.log(result);
  //       //console.log(this.complainantArray)
  //     }, (error => {

  //     })
  //       (complete => {
  //         this.loading = false;
  //         console.log('123')
          
  //         this.toastrService.success("Case member added !", "success")
  //       })
  //     );
  // }


  public onvalChanges() {
    this.caseMemberForm.get('county').valueChanges.subscribe(id => {
      this._httpService.get('counties?county=' + id).subscribe(
        result => {
          console.log(result)
          this.dataSet = result.data.subcounties;
          this.subcounties = this.dataSet;
        });

    })
  }
  public getCounties(): any {
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

  private getStations(): any {
    this._httpService.get('getallstations').subscribe(
      result => {
        this.dataSet = result.data.stations;
        this.stations = this.dataSet;
        console.log(this.stations);
      },
      (err: HttpErrorResponse) => {
        if (err.error instanceof Error) {
          console.log("Client-side error occured.");
        } else {
          console.log("Server-side error occured.");
        }
      });
  }

  private getallroles(): any {
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

  public getCases(): any {
    this._httpService.get('getcases').subscribe(
      result => {
        console.log(result.data.cases);
        if (result.status === 'success') {
          this.cases = result.data.cases;
          console.log(this.cases)
        }
      },
      error => {

      },
      complete => {

      }
    )
  }
}
