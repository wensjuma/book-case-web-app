import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, ReactiveFormsModule, FormBuilder, Validators} from '@angular/forms';
import { GlobalService } from 'src/app/pages/common/services/global.service';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Counties } from 'src/app/pages/settings/models/counties';
import { Subcounties } from 'src/app/pages/settings/models/subcounties';
import { HttpService } from 'src/app/pages/common/services/http.service';
import { ToastrService } from 'ngx-toastr';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
//import { type } from 'os';


@Component({
  selector: 'app-complainant',
  templateUrl: './complainant.component.html',
  styleUrls: ['./complainant.component.scss']
})
export class ComplainantComponent implements OnInit {
    loading: boolean = false;
    submitted: boolean = true;
    public steps:any[];
    public complainantForm:FormGroup;
    public defendantForm:FormGroup;
    public caseForm:FormGroup;
    public details:any = {};
    public showConfirm:boolean;
    public confirmed:boolean;
    public dataSet: any;
    public data: any;
    public id: any;
    public counties: any;
    public subcounties: any;
    public commandInterface: any;
    public countyId: any;

    constructor(private formBuilder: FormBuilder,
        private globalService: GlobalService,
        private http: HttpClient,
        private _httpService: HttpService,
        private toastrService: ToastrService,
        private modalService: NgbModal,



        ) { 

        this.steps = [
          {name: 'Complainant', icon: 'fa-lock', active: true, valid: false, hasError:false },
          {name: 'Defendant', icon: 'fa-user', active: false, valid: false, hasError:false },
          {name: 'Case Details', icon: 'fa-credit-card', active: false, valid: false, hasError:false },
        ]

        // this.defendantForm = this.formBuilder.group({
        //     'salutation': [''],
        //     'fullname': [''],
        //     'idnumber': [''],
        //     'gender': [''],
        //     'email': [''],
        //     'phone': [''],
        //     'age': [''],
        //     'county': [''],
        //     'subcounty' : [''],
        //     'address' : ['']
         
        // });

        this.complainantForm = this.formBuilder.group({
            'salutation': ['', Validators.nullValidator],
            'fullname': ['', Validators.required],
            'idnumber': ['',Validators.compose([
              Validators.required, Validators.minLength(6),
              Validators.maxLength(8), Validators.pattern('[0-9]+')  
            ]) ],
            'gender': ['', Validators.required],
            'email': ['', Validators.compose([
              Validators.required,
              // Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
            ])],
            'phone': ['', Validators.compose([
              Validators.required,
              // Validators.pattern('/^\+?\d{1,3}[- ]?\d{3}[- ]?\d{5}$/')
            ])],
            'age': [''],
            'county': [''],
            'subcounty' : [''],
            'address' : ['']
        });

        this.caseForm = this.formBuilder.group({
            // 'casetype': [''],
            'charges': ['', Validators.required],
            'offence': ['', Validators.required],
            'evidence': [''],
            'complainantStatement': [''],
            'defendantStatement': [''],
            'witnessStatement': ['']
        });    
    }

    public next(){
        let complainantForm = this.complainantForm;
        let defendantFor = this.defendantForm;
        let caseForm = this.caseForm;

        if(this.steps[this.steps.length-1].active)
            return false;
            
        this.steps.some(function (step, index, steps) {
            if(index < steps.length-1){
                if(step.active){
                    if(step.name=='Complainant'){
                        if (complainantForm.valid) {
                            step.active = false;
                            step.valid = true;
                            steps[index+1].active=true;
                            return true;
                        }
                        else{
                            step.hasError = true;
                        }                      
                    }
                    if(step.name=='Defendant'){
                        if (complainantForm.valid) {
                            step.active = false;
                            step.valid = true;
                            steps[index+1].active=true;
                            return true;
                        }
                        else{
                            step.hasError = true;
                        }                      
                    }
                    if(step.name=='Casedetails'){
                        if (caseForm.valid) {
                            step.active = false;
                            step.valid = true;
                            steps[index+1].active=true;
                            return true;
                        }
                        else{
                            step.hasError = true;
                        }                      
                    }
                }
            }   
        });
    }

    public prev(){
        if(this.steps[0].active)
            return false;
        this.steps.some(function (step, index, steps) {
            if(index != 0){
                if(step.active){
                    step.active = false;
                    steps[index-1].active=true;
                    return true;
                }
            }             
        });
    }

    public confirm(){
        this.steps.forEach( step => step.valid = true );
        this.confirmed = true;
    }

    ngOnInit(){
        this.getCounties(); 
        this.onChanges();
    }

    onChanges(){
      this.commandInterface = {
        request_type: 'subcounties',
        client_type : { 
           "useragentversion" : "android kit kat",
            "useragent" : "android"}
      },
        this.defendantForm.get('county').valueChanges.subscribe(id => {
            this._httpService.get('counties?county=' + id )
            .subscribe(result => { this.dataSet = result['data']; 
            this.subcounties = this.dataSet.subcounties;
          });

        })
    }
    
      private getCounties(): any{
        this._httpService.get('counties').subscribe(
          result => {
            console.log(result);
            this.dataSet = result.data.counties; 
            this.counties = this.dataSet;
            console.log(this.counties);
        },
        (err: HttpErrorResponse) => {
          if (err.error instanceof Error) {
            console.log("Client-side error occured.");
          } else {
            console.log("Server-side error occured.");
          }
        });
      }

      public createComplainant(): void {
        console.log(this.complainantForm)
        this.loading = true;
        this.submitted = true;
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
            countydetails: { 'county': this.defendantForm.value.county , 'subcounty': this.defendantForm.value.subcounty } 
          }
        };
        console.log(this.commandInterface);
        this._httpService.post(this.commandInterface)
          .subscribe(result => {
              console.log(result);
            if (result.status === 'success' && result['data']['auth_token']) {
              this.toastrService.success('Record created successfully!', 'Created Successfully!');
               localStorage.setItem('rules', result['data']['id']);
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

      
      public createDefendant(): void {
        console.log(this.complainantForm)
        this.loading = true;
        this.submitted = true;
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
            countydetails: { 'county': this.defendantForm.value.county , 'subcounty': this.defendantForm.value.subcounty } 
          }
        };
        console.log(this.commandInterface);
        this._httpService.post(this.commandInterface)
          .subscribe(result => {
              console.log(result);
            if (result.status === 'success' && result['data']['auth_token']) {
              this.toastrService.success('Record created successfully!', 'Created Successfully!');
               localStorage.setItem('rules', result['data']['id']);
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


      public createCase(): void {
        this.loading = true;
        this.submitted = true;
        this.commandInterface = {
          request_type: 'createcase',
          client_type: {
            "useragentversion": "android kit kat",
            "useragent": "android"
          },
          session_data: {
            casetype: 3,
            complainant: 1,
            defendant: 2,
            casedetails: {
              'charges': this.caseForm.value.charges ,
               'offence': this.caseForm.value.offence,
               'evidence': this.caseForm.value.evidence,
               'complainantStatement': this.caseForm.value.complainantStatement,
               'defendantStatement': this.caseForm.value.defendantStatement,
               'witnessStatement': this.caseForm.value.witnessStatement,
            }

          }
        };
        console.log(this.commandInterface);
        this._httpService.post(this.commandInterface)
          .subscribe(result => {
              console.log(result);
            if (result.status === 'success') {
              this.toastrService.success('Record created successfully!', 'Created Successfully!');
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
      

    }
