import { animate } from '@angular/animations';
import { CellOccupancyModalComponent } from './cell-occupancy-modal/cell-occupancy-modal.component';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { NgbModal, NgbModalRef, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { CellModalComponent } from './cell-modal/cell-modal.component';
import { FormBuilder, FormGroup } from '@angular/forms';
import { GlobalService } from '../../common/services/global.service';
import { HttpClient } from '@angular/common/http';
import { ApiService } from '../../common/services/api.service';
import { ToastrService } from 'ngx-toastr';
import { HttpService } from '../../common/services/http.service';
import { AuthService } from '../../auth/services/auth.service';

@Component({
  selector: 'app-cells',
  templateUrl: './cells.component.html',
  styleUrls: ['./cells.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class CellsComponent {
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
  public formData;
  public modalRef: NgbModalRef;
  public form: FormGroup;
  modalOption: any // NgbModalOptions;
  cellMembers: any;
  cellVaccantSpace: any;
  // public data = [];
  public settings = {
    selectMode: 'single',  //single|multi
    hideHeader: false,
    hideSubHeader: false,
    actions: {
      columnTitle: 'Actions',
      add: false,
      edit: false,
      delete: false,
      custom: [
       // { name: 'openFormModal', title: '<i class="fa fa-pencil"></i>&nbsp; &nbsp;' },
        { name: 'viewCellOccupancy', title: '<span class="btn btn-primary btn-sm"><i class="fa fa-eye"></i>&nbsp;Members</span>&nbsp;&nbsp;' },
      ],
      position: 'right' // left|right
    },
    delete: {
      deleteButtonContent: '<i class="fa fa-trash-o text-danger"></i>',
      confirmDelete: true
    },
    noDataMessage: 'No data found',
    columns: {
      stationcellid: {
        title: 'Cell ID',
        editable: false,
        width: '80px',
        type: 'html',
        valuePrepareFunction: (value) => {
          return '<div class="text-center">' + value + '</div>';
        }
      },
      cellname: {
        title: 'Cell Name',
        type: 'string',
        filter: true
      },
      capacity: {
        title: 'Capacity',
        type: 'string',
        filter: true
      },
      celltype: {
        title: 'Cell Type',
        type: 'string'
      },
      cellclass: {
        title: 'Cell Class',
        type: 'string'
      }
    },
    pager: {
      display: true,
      perPage: 5
    }
  };

  constructor(private modalService: NgbModal,
    private _httpService: HttpService,
    public toastrService: ToastrService,
  ) {
    this.getCells();
    // this.getData((data) => {
    //   this.data = data;
    // });
  }

  // public getData(data) {
  //   const req = new XMLHttpRequest();
  //   req.open('GET', 'assets/data/cells.json');
  //   req.onload = () => {
  //     data(JSON.parse(req.response));
  //   };
  //   req.send();
  // }

  public onDeleteConfirm(event): void {
    if (window.confirm('Are you sure you want to delete?')) {
      event.confirm.resolve();
    } else {
      event.confirm.reject();
    }
  }

  public onRowSelect(event) {
    // console.log(event);
  }

  public onUserRowSelect(event) {
    //console.log(event);   //this select return only one page rows
  }

  public onRowHover(event) {
    //console.log(event);
  }

  public openFormModal(formData) {
    console.log(formData)
    this.modalOption = {
      backdrop: 'static',
      keyboard: false
    }

    this.modalRef = this.modalService.open(CellModalComponent, this.modalOption);
    if (formData) {
      this.modalRef.componentInstance.title = 'Edit Station Info ';

    } else {
      this.modalRef.componentInstance.title = 'Add Station';

    }

    this.modalRef.componentInstance.formData = formData;
    this.modalRef.result.then((result) => {
      if (result === 'success') {
        this.getCells();
      }
    }, (reason) => {
    });
  }

  public viewCellOccupancy(data: any) {
    //console.log(data.stationcellid)
    console.log(data)
    this.modalOption = {
      keyboard: false,
      backdrop: 'static',
      size: 'lg',
      animated: true

    }


    this._httpService.get('celloccupancy?cellid=' + data.stationcellid)
      .subscribe(res => {
        this.cellMembers = res;
       
        this.modalRef = this.modalService.open(CellOccupancyModalComponent, this.modalOption)
        this.modalRef.componentInstance.members = this.cellMembers;
        this.modalRef.componentInstance.eventData = data;
        
        //console.log(this.modalRef.componentInstance.event)
        this.cellVaccantSpace = data.capacity - this.cellMembers.data.guests.length;
        //console.log(this.cellVaccantSpace)
        this.modalRef.componentInstance.vaccants = this.cellVaccantSpace;
        

        
      }), error => {
        //console.log(error)
      }, complete => {


      }
    // let modalRef= 

  }

  public getCells(): any {
    this._httpService.get('fetchcellbystationid').subscribe(
      result => {
        console.log(result.data.cells);
        if (result.status === 'success') {
          this.dataSet = result.data.cells;
        }
      },
      error => {

      },
      complete => {

      }
    )
  }
  public onCustomAction(event: any): void {
    console.log(event);
    switch (event.action) {
      case 'openFormModal':
        this.openFormModal(event.data);
        break;
      case 'viewCellOccupancy':
        this.viewCellOccupancy(event.data);
        break;
      default:
        break;
    }
  }
}
