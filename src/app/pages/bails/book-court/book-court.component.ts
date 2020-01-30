import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { HttpService } from 'src/app/pages/common/services/http.service';
import { ToastrService } from 'ngx-toastr';
import {NgbDateAdapter, NgbDateStruct, NgbDateNativeAdapter} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-book-court',
  templateUrl: './book-court.component.html',
  styleUrls: ['./book-court.component.scss'],
  providers: [{provide: NgbDateAdapter, useClass: NgbDateNativeAdapter}]
})
export class BookCourtComponent implements OnInit {

  model1: Date;
  model2: Date;
  form: FormGroup;
  loading: boolean = false;
  submitted: boolean = true;
  commandInterface: any;

  constructor( public activeModal: NgbActiveModal,
                private formBuilder: FormBuilder,
                private _httpService: HttpService,
                private toastrService: ToastrService
    ) { }

  ngOnInit() {
    this.form = this.formBuilder.group({
      'court': ['', Validators.required],
      'date': ['', Validators.required],
    });
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
        court: this.form.value.court,
        date: this.form.value.date,
      }
    };
    
    this._httpService.post(this.commandInterface)
      .subscribe(result => {
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

  closeModal() {
    this.activeModal.close('Modal Closed');
  }

}
