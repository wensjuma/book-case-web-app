import { HttpService } from 'src/app/pages/common/services/http.service';
import { from } from 'rxjs';
import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Alert } from 'selenium-webdriver';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-payments',
  templateUrl: './payments.component.html',
  styleUrls: ['./payments.component.scss']
})
export class PaymentsComponent implements OnInit {
  @Input() formData: any;
  @Input() caseInfo: any;
  form: FormGroup;
  submitted: boolean = false;
  loading: boolean = false;
  commandInterface: any;
  
  constructor(
    public activeModal: NgbActiveModal,
    private formBuilder: FormBuilder,
    public toastService: ToastrService,
    private _httpService:  HttpService
  ) {
   
   }

  ngOnInit() {
    console.log(this.caseInfo)
    console.log(this.formData)
    this.form = this.formBuilder.group({
      'amount': ['', Validators.required],
      'caseid': [this.caseInfo? this.caseInfo: '', Validators.required]
    });
  }
  applyBail(){  
    this.loading = true;
    this.submitted = true;
    
    this.commandInterface = {
      request_type: 'applybail',
      client_type: {
        "useragentversion": "android kit kat",
        "useragent": "android"
      },
      session_data: {
        casememberid:this.formData.casememberid,
        amount: this.form.value.amount,
        caseid: this.form.value.caseid,
      }
    };
    console.log(this.commandInterface);
    this._httpService.post(this.commandInterface)
      .subscribe(result => {
        console.log(result)
        if (result.status === 'success') {
          this.toastService.success('Bail Application Successful !', 'Success');
          this.closeModal()
        } else {
          
        }
      }, error => {
        console.log(error)
       
      },
        complete => {
          this.loading = false;
        });
   
  }

  closeModal() {
   this.activeModal.close('Modal Closed');
  }

}
