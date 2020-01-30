import { Component, ViewEncapsulation, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { CustomValidators } from 'ng2-validation';
import { HttpService } from 'src/app/pages/common/services/http.service';
import { HttpErrorResponse } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-ob',
  templateUrl: './create-ob.component.html',
  styleUrls: ['./create-ob.component.scss']
})
export class CreateObComponent implements OnInit {
  public dataSet: any;
  public counties: any;
  private complainantId;
  private defendantId;
  private complainants: any;
  public placeholder: string = 'Enter National ID to search';
  public keyword = 'name';
  public historyHeading: string = 'Recently selected';
  private commandInterface = {
    request_type: '',
    client_type: {
      "useragentversion": "android kit kat",
      "useragent": "android"
    },
    session_data: {},
  };
  public steps: any[];
  public complainantForm: FormGroup;
  public defendantForm: FormGroup;
  public caseForm: FormGroup;
  public searchForm: FormGroup;
  public details: any = {};
  public showConfirm: boolean;
  public confirmed: boolean = false;
  public caseType: any;
  public ComplainantIDs: any[];
  public defendantIDs: any[];
  searchKey: any;
  caseMembers: any;
  errorResponseMessage: string;
  _submitted: boolean = false;
  sendCaseDetails: any;
  subcounties: any;

  constructor(
    private formBuilder: FormBuilder,
    private _httpService: HttpService,
    private _toastrService: ToastrService,
    private router: Router,
  ) {
    this.defendantIDs = [];
    this.ComplainantIDs = [];
    this.steps = [
      {
        name: 'Complainant Info',
        icon: 'fa-user',
        active: true,
        valid: false,
        hasError: false
      },
      {
        name: 'Defendant Info',
        icon: 'fa-user',
        active: false,
        valid: false,
        hasError: false
      },
      {
        name: 'Case Info',
        icon: 'fa-book',
        active: false,
        valid: false,
        hasError: false
      },
      {
        name: 'Confirm Your Details',
        icon: 'fa-check-square-o',
        active: false,
        valid: false,
        hasError: false
      }
    ]
    this.searchForm = this.formBuilder.group({
      'idsearch': [''],
    })
    /**
     * definition of the complainants form with validations
     */
    this.complainantForm = this.formBuilder.group({

      'fullname': ['', Validators.required],
      'idnumber': ['', Validators.compose([
        Validators.required, Validators.minLength(6),
        Validators.maxLength(8), Validators.pattern('[0-9]+')
      ])],
      'gender': ['', Validators.required],
      'email': ['', Validators.compose([
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
      ])],
      'phone': ['', Validators.compose([
        Validators.required,
        // Validators.pattern('/^\+?\d{1,3}[- ]?\d{3}[- ]?\d{5}$/')
      ])],
      'age': ['', Validators.required],
      'county': ['', Validators.required],
      'subcounty': ['', Validators.required],
      'address': [''],

    });
    /**
     * definition of the defendants form with validations 
     */
    this.defendantForm = this.formBuilder.group({

      'fullname': ['', Validators.required],
      'idnumber': ['', Validators.compose([
        Validators.required, Validators.minLength(6),
        Validators.maxLength(8), Validators.pattern('[0-9]+')
      ])],
      'gender': ['', Validators.required],
      'email': ['', Validators.compose([
        Validators.required
        // Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
      ])],
      'phone': ['', Validators.compose([
        Validators.required,
        //Validators.pattern('^\+?\d{1,3}[- ]?\d{3}[- ]?\d{5}$')
      ])],
      'age': ['', Validators.required],
      'county': ['', Validators.required],
      'subcounty': ['', Validators.required],
      'address': ['', Validators.required]
    });

    /**
     * takes the case form definition and its validations
     */
    this.caseForm = this.formBuilder.group({
      'casetype': ['', Validators.required],
      'charges': ['', Validators.required],
      'offence': ['', Validators.required],
      'evidence': ['', Validators.required],
      'complainantStatement': [''],
      'defendantStatement': [''],
      'witnessStatement': [''],

    });
  }
  ngOnInit() {
    this.searchCaseMember();
    this.getCounties();
    this.onChanges();
    this.onvalChanges();
    this.getCaseType();
    this.getComplainants();

  }
  /**
   * method getCaseType makes a request for the casetypes 
   */
  public getCaseType() {
    this._httpService.get('casetypes').subscribe(
      result => {
        this.caseType = result.data.cases;
      })
  }

  public next() {
    let complainantForm = this.complainantForm;
    let defendantForm = this.defendantForm;
    let caseForm = this.caseForm;

    if (this.steps[this.steps.length - 1].active)
      return false;

    this.steps.some((step, index, steps) => {
      if (index < steps.length - 1) {
        if (step.active) {
          if (step.name === 'Complainant Info') {
            if (complainantForm.valid) {
              step.active = false;
              step.valid = true;
              steps[index + 1].active = true;
              return true;
            }
            else {
              step.hasError = true;
            }
          }
          if (step.name === 'Defendant Info') {
            if (defendantForm.valid) {
              step.active = false;
              step.valid = true;
              steps[index + 1].active = true;
              return true;
            }
            else {
              step.hasError = true;
            }
          }
          if (step.name === 'Case Info') {
            if (caseForm.valid) {
              step.active = false;
              step.valid = true;
              steps[index + 1].active = true;
              return true;
            }
            else {
              step.hasError = true;
            }
          }
        }
      }
    });
  }
  public prev() {
    if (this.steps[0].active)
      return false;
    this.steps.some((step, index, steps) => {
      if (index != 0) {
        if (step.active) {
          step.active = false;
          steps[index - 1].active = true;
          return true;
        }
      }
    });
  }

  public confirm() {
    this.steps.forEach(step => step.valid = true);
    this.confirmed = true;
    this.createComplainant();
  }

  onChanges() {
    this.defendantForm.get('county').valueChanges.subscribe(id => {
      this._httpService.get('counties?county=' + id).subscribe(
        result => {
          this.dataSet = result.data.subcounties;
          this.subcounties = this.dataSet;
        });

    })
  }
  /**
   * select county leads to subcounties
   * takes the id of the selected county and makes a request for the subcounties under the  selected county
   */
  onvalChanges() {
    this.complainantForm.get('county').valueChanges.subscribe(id => {
      this._httpService.get('counties?county=' + id).subscribe(
        result => {
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
        let data ="hello";
        console.log(data)




      },
      (err: HttpErrorResponse) => {
        if (err.error instanceof Error) {
          console.log("Client-side error occured.");
        } else {
          console.log("Server-side error occured.");
        }
      });
  }
  /**
   * the method creates a complainant and 
   * returns the id of the created complainant to the create case request/method
   */
  public createComplainant(): void {
    this.commandInterface = {
      request_type: 'addcasemember',
      client_type: {
        "useragentversion": "android kit kat",
        "useragent": "android"
      },
      session_data: {
        name: this.complainantForm.value.fullname,
        nationalidnumber: this.complainantForm.value.idnumber,
        phonenumber: this.complainantForm.value.phone,
        age: this.complainantForm.value.age,
        gender: this.complainantForm.value.gender,
        email: this.complainantForm.value.email,
        countydetails: { 'county': 'nairobi', 'subcounty': 'embakasi' }
      }
    };
    this._httpService.post(this.commandInterface)
      .subscribe(result => {
        this.complainantId = result.data.id;
        return this.defendantIDs.push(this.complainantId);
      }, error => {
        this.errorResponseMessage = error.error.message;     
        this._toastrService.error(this.errorResponseMessage, "Error");
      },
        complete => {
          this.createDefendant()
        });
  }
  /**
   * the method creates a defendant and 
   * returns the id of the created defendant to the create case request/method
   */
  public createDefendant(): void {
    this.commandInterface = {
      request_type: 'addcasemember',
      client_type: {
        "useragentversion": "android kit kat",
        "useragent": "android"
      },
      session_data: {
        name: this.defendantForm.value.fullname,
        nationalidnumber: this.defendantForm.value.idnumber,
        phonenumber: this.defendantForm.value.phone,
        age: this.defendantForm.value.age,
        gender: this.defendantForm.value.gender,
        email: this.defendantForm.value.email,
        countydetails: { 'county': 'nairobi', 'subcounty': 'embakasi' }
      }
    };
    this._httpService.post(this.commandInterface)
      .subscribe(result => {
        this.defendantId = result.data.id;
        return this.ComplainantIDs.push(this.defendantId)
      }, error => {
        this.errorResponseMessage = error.error.message;
        this._toastrService.error(this.errorResponseMessage, "Error");
      },
        complete => {
          this.createCase();
        });
  }
  public createCase(): void {
    this.commandInterface = {
      request_type: 'createcase',
      client_type: {
        "useragentversion": "android kit kat",
        "useragent": "android"
      },
      session_data: {
        casetypeid: this.caseForm.value.casetype,
        /**complainant id and defendant ids 
         * from methods createComplainant()  and createDefendant() */
        complainant: this.ComplainantIDs,
        defendant: this.defendantIDs,
        casedetails: {
          // 'casetype':this.caseForm.value.casetype,
          'charges': this.caseForm.value.charges,
          'offence': this.caseForm.value.offence,
          'complainantStatement': this.caseForm.value.complainantStatement,
          'evidence': this.caseForm.value.evidence,
          'defendantStatement': this.caseForm.value.defendantStatement,
          'witnessStatement': this.caseForm.value.witnessStatement,
        }
      }
    };
    this._httpService.post(this.commandInterface)
      .subscribe(result => {
        this._toastrService.success("OB case created successfully ", "Success")
        this.sendCaseDetails = result.data;
        return this.sendCaseDetails;
      }, error => {
        this.errorResponseMessage = error['message'];    
      },
        complete => {   
          this.router.navigate(['/stations/ob-records']);
        });
  }
  public getComplainants(): any {
    this._httpService.get('getactivecomplainants').subscribe(
      result => {
        if (result.status === 'success') {
          this.dataSet = result.data.complainants;
          this.complainants = this.dataSet;
        }
      },
      //getcasememberbyid
      error => {

      },
      complete => {

      }
    )
  }
  public searchCaseMember(): any {
    this.commandInterface = {
      request_type: 'getcasememberbyid',
      client_type: {
        "useragentversion": "android kit kat",
        "useragent": "android"
      },
      session_data: {
        nationalidnumber: this.searchForm.value.idsearch,
      }
    }
    this._httpService.post(this.commandInterface).subscribe(
      result => {
        if (result.status === 'success') {
          this.caseMembers = result.data['case members'];
          this.searchKey = this.caseMembers;
          // return this.searchKey
        }
      },
      //getcasememberbyid
      error => {

      },
      complete => {

      }
    )
  }
  selectEvent(item) {
    // do something with selected item
  }

  onChangeSearch() {
    // fetch remote data from here
    // And reassign the 'data' which is binded to 'data' property.
  }

  onFocused(e) {
    // do something
  }

}
