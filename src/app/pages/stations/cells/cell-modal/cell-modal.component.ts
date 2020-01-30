import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/pages/auth/services/auth.service';
import { GlobalService } from 'src/app/pages/common/services/global.service';
import { ApiService } from 'src/app/pages/common/services/api.service';
import { HttpService } from 'src/app/pages/common/services/http.service';
import { ToastrService } from 'ngx-toastr';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-cell-modal',
  templateUrl: './cell-modal.component.html',
  styleUrls: ['./cell-modal.component.scss']
})
export class CellModalComponent implements OnInit {
  @Input() title: any;
  @Input() formData: any;
  @Input() mode: any;
  form: FormGroup;
  loading: boolean = false;
  submitted: boolean = true;
  commandInterface: any;
  constructor(
    public activeModal: NgbActiveModal,
    private formBuilder: FormBuilder,
    private _httpService: HttpService,
    private toastrService: ToastrService
  ) {

  }
  ngOnInit() {
    this.form = this.formBuilder.group({
      'cellname': [this.formData ? this.formData.cellname : '', Validators.required],
      'capacity': [this.formData ? this.formData.capacity : '', Validators.required],
      'celltype': [this.formData ? this.formData.celltype : '', Validators.required],
      'cellclass': [this.formData ? this.formData.cellclass : '', Validators.required]
    });
    // }else{
    //   console.log(this.mode)
    //   this.form = this.formBuilder.group({
    //     'cellname': ['', Validators.required],
    //     'capacity': ['', Validators.required],
    //     'celltype': ['', Validators.required],
    //     'cellclass': [ '', Validators.required]
    //   });
  }

  public submitData(): void {
    this.loading = true;
    this.submitted = true;
    this.commandInterface = {
      request_type: 'addstationcell',
      client_type: {
        "useragentversion": "android kit kat",
        "useragent": "android"
      },
      session_data: {
        cellname: this.form.value.cellname,
        capacity: this.form.value.capacity,
        celltype: this.form.value.celltype,
        cellclass: this.form.value.cellclass,
      }
    };
    console.log(this.commandInterface);
    this._httpService.post(this.commandInterface)
      .subscribe(result => {
        if (result.status === 'success') {
          this.toastrService.success('Record created successfully!', 'Created Successfully!');
          this.activeModal.close('success');
        } else {
          // this.handleErrorsFromServer(result);
        }
      }, error => {
        //this.errorMessages = error.error.error_messages;
        // this.submitted = false;
        // this.invalidLogin = true;
        // this.errorMessage = error['error']['message'];
      },
        complete => {
          this.loading = false;
          this.submitted = false;
        });
  }
  public saveUpdate(): void {
    this.loading = true;
    this.submitted =true;
    this.commandInterface = {
      request_type: 'addstationcell',
      client_type: {
        "useragentversion": "android kit kat",
        "useragent": "android"
      },
      session_data: {
        cellname: this.form.value.cellname,
        capacity: this.form.value.capacity,
        celltype: this.form.value.celltype,
        cellclass: this.form.value.cellclass,

      }
    };


    this._httpService.put("", this.commandInterface).
      subscribe(result => {
        result = result;

      }, error => { },
        complete => {
          this.loading= false;
          this.submitted= false;
         }
      );
  }
  closeModal() {
    this.activeModal.close('Modal Closed');
  }

}
