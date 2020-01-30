import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpService } from 'src/app/pages/common/services/http.service';
import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-addcourt-official',
  templateUrl: './addcourt-official.component.html',
  styleUrls: ['./addcourt-official.component.scss']
})
export class AddcourtOfficialComponent implements OnInit {
 loading: boolean;
 submitted: boolean;
 commandInterface: any;
 form: FormGroup;
 roles: string;
 station: any;
  constructor( 
    private _httpService: HttpService,
    private formBuilder: FormBuilder,
    public activeModal: NgbActiveModal,
    private toastrService: ToastrService
   ) { 
      this.form = this.formBuilder.group({
        'name': ['', Validators.required],
        'rolename': ['', Validators.required],
        'stationid': ['', Validators.required],
        'email': ['', Validators.required],
        'phonenumber': ['', Validators.required],
        'nationalidnumber': ['', Validators.required]
      });
    }

  ngOnInit() {
      this.loadRoles()
      this.getStations()
  }
  public loadRoles(): any {
    this._httpService.get('allroles').subscribe(
      result => {
        if (result.status === 'success') {
          this.roles = result.data;
        }
      },
      error => {

      },
      complete => {

      }
    )
  }
  private getStations(): any{
    this._httpService.get('getallstations').subscribe(
      result => {
        this.station = result.data.stations;
       ;  
        
    },
   );
  }
  public saveData(){
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
        phonenumber: this.form.value.phonenumber,
        email: this.form.value.email,
        station:this.form.value.stationid,
        nationalidnumber: this.form.value.nationalidnumber,

      }
    };
    this._httpService.post(this.commandInterface)
      .subscribe(result => {
        if (result.status === 'success') {
          this.closeModal();
          this.toastrService.success('Court official added successfully!', 'Success');
        } else {
          // this.handleErrorsFromServer(result);
        }
      }, error => {
       console.log(error)
      },
        complete => {
          this.loading = false;
        });
  }
  

  closeModal() {
    this.activeModal.close('success');
  }


}
