import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators} from '@angular/forms';
import { GlobalService } from 'src/app/pages/common/services/global.service';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { HttpService } from 'src/app/pages/common/services/http.service';
import { ToastrService } from 'ngx-toastr';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-defendant',
  templateUrl: './defendant.component.html',
  styleUrls: ['./defendant.component.scss']
})
export class DefendantComponent  {

    public steps:any[];
    public complainantForm:FormGroup;
    public defendantForm:FormGroup;
    public caseForm:FormGroup;
    public details:any = {};
    public showConfirm:boolean;
    public confirmed:boolean;
    loading: boolean = false;
    submitted: boolean = true;
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

        let password = new FormControl('', Validators.compose([Validators.required, Validators.minLength(6)]));
        let confirmPassword = new FormControl('', Validators.compose([Validators.required]));  

        this.steps = [
          {name: 'Police ID', icon: 'fa-lock', active: true, valid: false, hasError:false },
          {name: 'Defendant', icon: 'fa-user', active: false, valid: false, hasError:false },
          {name: 'Case details', icon: 'fa-credit-card', active: false, valid: false, hasError:false },
        //   {name: 'Confirm Details', icon: 'fa-check-square-o', active: false, valid: false, hasError:false }
        ]

        this.complainantForm = this.formBuilder.group({
            'policeid': ['']         
        });
        this.complainantForm = this.formBuilder.group({
            'salutation': ['', Validators.required],
            'fullname': [''],
            'idnumber': [''],
            'gender': [''],
            'email': [''],
            'phone': [''],
            'age': [''],
            'county': [''],
            'subcounty' : [''],
            'address' : ['']
         
        });

        this.defendantForm = this.formBuilder.group({
            'salutation': [''],
            'fullname': ['', Validators.required],
            'idnumber': ['', Validators.required],
            'gender': [''],
            'email': [''],
            'phone': [''],
            'age': [''],
            'county': [''],
            'subcounty' : [''],
            'address' : ['']
        });

        this.caseForm = this.formBuilder.group({
            'casetype': ['', Validators.required],
            'charges': [''],
            'offence': [''],
            'complainantStatement': ['', Validators.required],
            'defendantStatement': [''],
            'witnessStatement': ['']
        });    
    }

    ngOnInit(){
        this.getCounties(); 
        this.onChanges();
    }
    public next(){
        let complainantForm = this.complainantForm;
        let defendantForm = this.defendantForm;
        let caseForm = this.caseForm;

        if(this.steps[this.steps.length-1].active)
            return false;
            
        this.steps.some(function (step, index, steps) {
            if(index < steps.length-1){
                if(step.active){
                    if(step.name=='Police ID'){
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
                        if (defendantForm.valid) {
                            step.active = false;
                            step.valid = true;
                            steps[index+1].active=true;
                            return true;
                        }
                        else{
                            step.hasError = true;
                        }                      
                    }
                    if(step.name=='Case Details'){
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

        this.details.username = this.complainantForm.value.username;
        this.details.fullname = this.defendantForm.value.firstname + " " + this.defendantForm.value.lastname;
        this.details.gender = this.defendantForm.value.gender;
        this.details.email = this.defendantForm.value.email;
        this.details.phone = this.defendantForm.value.phone;
        this.details.country = this.defendantForm.value.country;
        this.details.zipcode = this.defendantForm.value.zipcode;
        this.details.address = this.defendantForm.value.address;
        this.details.cardtype = this.caseForm.value.cardtype;
        this.details.cardnumber = this.caseForm.value.cardnumber;  
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


 

}
