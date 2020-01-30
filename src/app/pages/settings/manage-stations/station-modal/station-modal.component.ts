import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, Validators, FormGroup, AbstractControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/pages/auth/services/auth.service';
import { GlobalService } from 'src/app/pages/common/services/global.service';
import { countyDetails } from 'src/app/pages/models/county';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Counties } from '../../models/counties';
import { Subcounties } from '../../models/subcounties';
import { ApiService} from '../../../common/services/api.service';
import { HttpService } from 'src/app/pages/common/services/http.service';


@Component({
  selector: 'app-station-modal',
  templateUrl: './station-modal.component.html',
  styleUrls: ['./station-modal.component.scss']
})
export class StationModalComponent implements OnInit {

  @Input() formData;
  dataSet: any;
  data: any;
  id: any;
  public loading = false;  
  public hasErrors = false;
  public errorMessages;
  public counties;
  public subcounties;
  private commandInterface: any;
  public submitted;
  public form: FormGroup;

  constructor( public activeModal: NgbActiveModal,
    private formBuilder: FormBuilder,
    private _httpService: HttpService,
    private toastrService: ToastrService
     ) { 
      this.form = this.formBuilder.group({
        'stationname': ['', Validators.required],
        'location': ['', Validators.required],
        'county': ['', Validators.required],
        'subcounty': ['', Validators.required]
      });
     }


  
  ngOnInit() {
    //this.onChanges();
    this.getCounties(); 

  }

  onChanges(){
  }

  get inputControl(): { [p: string]: AbstractControl } {
    return this.form.controls;
  }

      public submitData():void {  
        this.loading = true;
        this.submitted = true;
        this.commandInterface = {
            request_type: 'createstation',
            client_type:  {
                "useragentversion" : "android kit kat",
                "useragent" : "android"
        },
            session_data: {
                name: this.inputControl.stationname.value,
                location: this.inputControl.location.value,
                countydetails: { 'county': this.inputControl.county.value , 'subcounty': this.inputControl.subcounty.value }                 
          }
        };
      console.log(this.commandInterface);
        this._httpService.post(this.commandInterface)
        .subscribe(result => {
          if (result.status === 'success' ) {
            this.toastrService.success('Record created successfully!', 'Created Successfully!');
            this.activeModal.close('success');
            } else {
              this.handleErrorsFromServer(result);
            }
          }, error => {
            this.errorMessages = error.error.error_messages;
            // this.submitted = false;
            // this.invalidLogin = true;
            // this.errorMessage = error['error']['message'];
          },
          complete => {
            this.loading = false;
          });
      }

      public saveChanges(): void {
        this.loading = true;
        this.form.value.id = this.formData.id;
        this._httpService.post(this.form.value).subscribe(
          result => {
            if (result.response.response_status.response_code === 200) {
              this.toastrService.success('Changes saved!', 'Saved Successfully!');
              this.activeModal.close('success');
            } else {
              this.handleErrorsFromServer(result);
            }
          },
          error => {
            this.errorMessages = error.error.error_messages;
          },
          complete => {
            this.loading = false;
          }
    
        );
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

  public getCounties(): any{
    this._httpService.get('counties').subscribe(
      result => {
        this.counties = result.data.counties;
      }
    )
  }

  public closeModal(): void {
    this.activeModal.dismiss('Cross click');
  }

  public loadSubCounties(value: any): void {
  console.log(value);
  this._httpService.get('counties?county=' + value).subscribe(
    result => {
      this.subcounties = result.data.subcounties;
    }
  )
  }
}
