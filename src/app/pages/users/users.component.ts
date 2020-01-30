import { Component, ViewEncapsulation } from '@angular/core';
import { NgbModal, NgbActiveModal, NgbModalRef, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { AddUserComponent } from './add-user/add-user.component';
import { HttpService } from '../common/services/http.service';
import { FormGroup } from '@angular/forms';


@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  encapsulation: ViewEncapsulation.None
})

export class UsersComponent {
  public formData;
  public modalRef: NgbModalRef;
  dataSet: any;
  data: any;
  id: any;
  modalOptions: NgbModalOptions;
  public loading = false;  
  public hasErrors = false;
  public errorMessages;
  public counties;
  public subcounties;
  private commandInterface: any;

  public submitted;
  public form: FormGroup;
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
        { name: 'editRecord', title: '<i class="fa fa-pencil"></i>&nbsp;&nbsp;' },
      ],
      position: 'right' // left|right
    },
    delete: {
      deleteButtonContent: '<i class="fa fa-trash-o text-danger"></i>',
      confirmDelete: true
    },
    noDataMessage: 'No data found',
    columns: {     
      userid: {
        title: 'Police ID',
        editable: false,
        type: 'html',
        valuePrepareFunction: (value) => { return '<div class="text-center">' + value + '</div>'; }       
      },
      othernames: {
        title: 'Full Name',
        type: 'string'
      },
      station_name: {
        title: 'Station Name',
        type: 'string'
      },
      rolename: {
        title: 'Rank',
        type: 'number'
      },
      email: {
        title: 'Email Address',
        type: 'number'
      },
      nationalidnumber: {
        title: 'ID Number',
        type: 'number'
      }
    },
    pager: {
      display: true,
      perPage: 10
    }
  };

  constructor(private modalService: NgbModal,
    private _httpService: HttpService,
    
    ) { 
      this.getUsers();
  }

  // open() {
  //   // const modalRef = this.modalService.open(ModalComponent);
  //   const modalRef = this.modalService.open(AddUserComponent);
  //   modalRef.componentInstance.title = 'AddUser';
  // }


  // public getData(data) {
  //   const req = new XMLHttpRequest();
  //   req.open('GET', 'assets/data/police.json');
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

  public onRowSelect(event){
   // console.log(event);
  }

  public onUserRowSelect(event){
    //console.log(event);   //this select return only one page rows
  }

  public onRowHover(event){
    //console.log(event);
  }

  public getUsers(): any {
    this._httpService.get('adminlist').subscribe(
      result => {
        if (result.status === 'success') {
          this.dataSet = result.data['station admins'];
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
    this.modalOptions={
      backdrop: 'static',
      keyboard: false
    }
    this.modalRef = this.modalService.open(AddUserComponent, this.modalOptions);
    if (formData) {
      this.modalRef.componentInstance.title = 'Edit Station Info ';
    } else {
      this.modalRef.componentInstance.title = 'Add Station';
    }
    this.modalRef.componentInstance.formData = this.formData;
    this.modalRef.result.then((result) => {
      if (result === 'success') {
      this.getUsers();
      }
    }, (reason) => {
    });
  }


}
