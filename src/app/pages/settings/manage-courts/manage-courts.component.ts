import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { CustomValidators } from 'ng2-validation';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CourtModalComponent } from './court-modal/court-modal.component';
import { HttpService } from '../../common/services/http.service';

@Component({
  selector: 'app-manage-courts',
  templateUrl: './manage-courts.component.html',
  styleUrls: ['./manage-courts.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ManageCourtsComponent  {
  public data = [];
  public dataSet: any;
  public settings = {
    selectMode: 'single',  //single|multi
    hideHeader: false,
    hideSubHeader: false,
    actions: {
      columnTitle: 'Actions',
      add: false,
      edit: true,
      delete: true,
      custom: [],
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
      courtid: {
        title: 'Court ID',
        editable: false,
        width:'120px',
   
      },
      name: {
        title: 'Cell Class',
        width:'150px',
        type: 'string',
        filter: true
      }
    },
    pager: {
      display: true,
      perPage: 10
    }
  };

  constructor(private modalService: NgbModal,
              private _httpService: HttpService
    ) { 
      this.getCourts();
  }

  // open() {
  //   // const modalRef = this.modalService.open(ModalComponent);
  //   const modalRef = this.modalService.open(AddUserComponent);
  //   modalRef.componentInstance.title = 'AddUser';
  // }


  public onDeleteConfirm(event): void {
    if (window.confirm('Are you sure you want to delete?')) {
      event.confirm.resolve();
    } else {
      event.confirm.reject();
    }
  }

  public onRowSelect(event){
   // console.log(event);
  }

  public onUserRowSelect(event){
    //console.log(event);   //this select return only one page rows
  }

  public onRowHover(event){
    //console.log(event);
  }


  // openFormModal() {
  //   const modalRef = this.modalService.open(CourtModalComponent);
    
  //   modalRef.result.then((result) => {
  //     console.log(result);
  //   }).catch((error) => {
  //     console.log(error);
  //   });
  // }
 

  openFormModal() {
    const modalRef = this.modalService.open(CourtModalComponent);
    
    modalRef.result.then((result) => {
      console.log(result);
    }).catch((error) => {
      console.log(error);
    });
  }

  public getUsers(): any {
    this._httpService.get('getcourttypes').subscribe(
      result => {
        console.log(result.data.courttypes);
        if (result.status === 'success') {
          this.dataSet = result.data.courttypes;
        }
      },
      error => {

      },
      complete => {

      }
    )
  }

  public submitForm(value: any){
    console.log(value);
  }

  public getCourts(): any {
    this._httpService.get('getcourts').subscribe(
      result => {
        if (result.status === 'success') {
          this.dataSet = result.data.courts;
        }
      },
      error => {

      },
      complete => {

      }
    )
  }

}
