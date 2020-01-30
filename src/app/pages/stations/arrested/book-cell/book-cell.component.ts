import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { HttpService } from 'src/app/pages/common/services/http.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-book-cell',
  templateUrl: './book-cell.component.html',
  styleUrls: ['./book-cell.component.scss']
})
export class BookCellComponent implements OnInit {
  @Input() data;
  @Input() case;
  _data
  form: FormGroup;
  loading: any;
  submitted:any;
  commandInterface: any
  public dataSet: any;
  public cells: any;
  constructor(
    public activeModal: NgbActiveModal,
    private formBuilder: FormBuilder,
    private _httpService: HttpService,
    private toastrService: ToastrService
  ) { }

  ngOnInit() {
    //this._data= this.data.map(item=> item.email);
    console.log(this.data)
    console.log(this.case)

    this.form = this.formBuilder.group({
      'caseid': [this.case, Validators.required],
      'cellid': ['', Validators.required]
    });
    this.getCells();
   // console.log(this.data)
  }

  closeModal() {
    this.activeModal.close('Modal Closed');
  }

  public getCells(): any {
    this._httpService.get('fetchcellbystationid').subscribe(
      result => {
        console.log(result.data.cells);
        if (result.status === 'success') {
          this.dataSet = result.data.cells;
          this.cells = this.dataSet;
          console.log(this.cells)
        }
      },
      error => {

      },
      complete => {

      }
    )
  }
  public bookToCell(){
    this.loading = true;
    this.submitted = true;
    this.commandInterface = {
      request_type: 'booktocell',
      client_type: {
        "useragentversion": "android kit kat",
        "useragent": "android"
      },
      session_data: {
        casememberid:this.data.casememberid,
        cellid: this.form.value.cellid,
        caseid: this.form.value.caseid,
      }
    };
    console.log(this.commandInterface);
    this._httpService.post(this.commandInterface)
      .subscribe(result => {
        console.log(result)
        if (result.status === 'success') {
          this.toastrService.success('Successfully Booked to cell!', 'Success');
          this.activeModal.close('success');
        } else {
          
        }
      }, error => {
       
      },
        complete => {
          this.loading = false;
        });
  }

  }

