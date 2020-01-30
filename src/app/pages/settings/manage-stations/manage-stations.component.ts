import { Component, ViewEncapsulation, ViewChild, OnInit } from '@angular/core';
import { IMultiSelectOption, IMultiSelectSettings, IMultiSelectTexts } from 'angular-2-dropdown-multiselect';
import { FormControl, Validators, FormBuilder, FormGroup, AbstractControl } from '@angular/forms';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { StationModalComponent } from './station-modal/station-modal.component';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../auth/services/auth.service';
import { GlobalService } from '../../common/services/global.service';
import { HttpClient } from '@angular/common/http';
import { ApiService } from '../../common/services/api.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Stations } from '../models/stations';
import { HttpService } from '../../common/services/http.service';



@Component({
  selector: 'app-manage-stations',
  templateUrl: './manage-stations.component.html',
  styleUrls: ['./manage-stations.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ManageStationsComponent implements OnInit {
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
  // data: any;


  // public data = [];
  public formData;
  public modalRef: NgbModalRef;
  public settings = {
    selectMode: 'single',  //single|multi
    hideHeader: false,
    hideSubHeader: false,
    actions: {
      columnTitle: 'Actions',
      add: false,
      edit: true,
      delete: true,
      custom: [
        { name: 'addUsers', title: '<i class="fa fa-users"></i>&nbsp;&nbsp;' }
      ],
      position: 'right' // left|right
    },
    add: {
      addButtonContent: '<h4 class="mb-1"><i class="fa fa-plus ml-3 text-success"></i></h4>',
      createButtonContent: '<i class="fa fa-check mr-3 text-success"></i>',
      cancelButtonContent: '<i class="fa fa-times text-danger"></i>'
    },
    edit: {
      editButtonContent: '<i class="fa fa-pencil mr-3 text-primary"></i>',
      saveButtonContent: '<i class="fa fa-check mr-3 text-success"></i>',
      cancelButtonContent: '<i class="fa fa-times text-danger"></i>'
    },
    delete: {
      deleteButtonContent: '<i class="fa fa-trash-o text-danger"></i>',
      confirmDelete: true
    },
    noDataMessage: 'No data found',
    columns: {
      stationid: {
        title: 'ID',
        editable: false,
        width: '60px',
        type: 'html',
        valuePrepareFunction: (value) => { return '<div class="text-center">' + value + '</div>'; }
      },
      name: {
        title: 'Station Name',
        type: 'string',
        filter: true
      },
      countydetails: {
        title: 'County Name',
        type: 'string',
        valuePrepareFunction: (value) => {
          return value.county;
        },
        filter: true
      },
      subcounty: {
        title: 'SubCounty Name',
        type: 'string',
        filter: true
      },
      location: {
        title: 'Location',
        type: 'string',
        filter: true
      },
    },
    pager: {
      display: true,
      perPage: 10
    }
  };


  ngOnInit() {
  }
  constructor(private modalService: NgbModal,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
    private globalService: GlobalService,
    private http: HttpClient,
    private apiService: ApiService,
    private _httpService: HttpService,
    public toastrService: ToastrService
  ) {
    this.getStations();
  }

  get inputControl(): { [p: string]: AbstractControl } {
    return this.form.controls;
  }
  // public loadData(): any {  
  //   this.commandInterface = {
  //       request_type: 'stationsbysubcounty',
  //       client_type:  {
  //           "useragentversion" : "android kit kat",
  //           "useragent" : "android"
  //   },
  //       session_data: {
  //         subcounty:'Embakasi Central Sub County'
  //     }
  //   };
  //   this._httpService.post(this.commandInterface)
  //   .subscribe(result => {
  //     console.log(result);
  //       if (result.status === 'success') {
  //         this.dataSet = result.data.stations;
  //       } else {
  //       }
  //     },
  //     error => {
  //     },
  //     complete => {
  //     }
  //   );
  // }
  public getStations(): any {
    this._httpService.get('getallstations').subscribe(
      result => {
        console.log(result.status);
        if (result.status === 'success') {
          this.dataSet = result.data.stations;
        }
      },
      error => {

      },
      complete => {

      }
    )
  }


  public openModal(formData) {
    this.formData = formData;
    this.modalRef = this.modalService.open(StationModalComponent);
    if (formData) {
      this.modalRef.componentInstance.title = 'Edit Station Info ';
    } else {
      this.modalRef.componentInstance.title = 'Add Station';
    }
    this.modalRef.componentInstance.formData = this.formData;
    this.modalRef.result.then((result) => {
      if (result === 'success') {
      this.getStations();
      }
    }, (reason) => {
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
  public onDeleteConfirm(event): void {
    if (window.confirm('Are you sure you want to delete?')) {
      this._httpService.delete('developers/' + event.data.id).subscribe(
        result => {
          if (result.response_code === 200) {
            event.confirm.resolve();
            this.toastrService.success(event.data.id, 'Deleted!');
          } else {
            this.toastrService.error(event.data.id, 'Failed to Delete!');
          }
        }
      );
    } else {
      event.confirm.reject();
    }
  }
  private viewRecord(data: any) {
    this.router.navigate(['clients', data.id]);
  }
  public onCustomAction(event: any): void {
    console.log(event);
    switch (event.action) {
      case 'viewRecord':
        this.viewRecord(event.data);
        break;
      case 'editRecord':
        this.openModal(event.data);
        break;
      default:
        break;
    }
  }
  public getData(data) {
    const req = new XMLHttpRequest();
    req.open('GET', 'assets/data/stations.json');
    req.onload = () => {
      data(JSON.parse(req.response));
    };
    req.send();
  }

  // public onDeleteConfirm(event): void {
  //   if (window.confirm('Are you sure you want to delete?')) {
  //     event.confirm.resolve();
  //   } else {
  //     event.confirm.reject();
  //   }
  // }

  public onRowSelect(event) {
    // console.log(event);
  }

  public onUserRowSelect(event) {
    //console.log(event);   //this select return only one page rows
  }

  public onRowHover(event) {
    //console.log(event);
  }
  openFormModal() {
    const modalRef = this.modalService.open(StationModalComponent);
    // modalRef.componentInstance.user = this.user;

    // modalRef.componentInstance.passEntry.subscribe((receivedEntry) => {
    //   console.log(receivedEntry);
    //   })

    modalRef.result.then((result) => {
      console.log(result);
    }).catch((error) => {
      console.log(error);
    });
  }
  showSuccess() {
    this.toastrService.success('Hello world!', 'Toastr fun!');
  }
}
