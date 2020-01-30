import { HttpService } from 'src/app/pages/common/services/http.service';
import { Component, ViewEncapsulation, OnInit } from '@angular/core';
import { NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { AddcourtOfficialComponent } from './addcourt-official/addcourt-official.component';

@Component({
  selector: 'app-court-officials',
  templateUrl: './court-officials.component.html',
  styleUrls: ['./court-officials.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class CourtOfficialsComponent implements OnInit {
    public data = [];
    public roles: any;
    modalOption: NgbModalOptions
    public settings = {
      selectMode: 'single',  //single|multi
      hideHeader: false,
      hideSubHeader: false,
      actions: {
        columnTitle: 'Actions',
        add: true,
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
        clerkId: {
          title: 'Clerk ID',
          editable: false,
          type: 'html',
          valuePrepareFunction: (value) => { return '<div class="text-center">' + value + '</div>'; }       
        },
        fullName: {
          title: 'Full Name',
          type: 'string',
          filter: true
        },
        court: {
          title: 'Court',
          type: 'string'
        },
        email: {
          title: 'E-mail',
          type: 'string'
        },
        phoneNumber: {
          title: 'Phone Number',
          type: 'number'
        },
        idNo: {
          title: 'ID Number',
          type: 'number'
        }
      },
      pager: {
        display: true,
        perPage: 10
      }
    };
  
    constructor(
      private modalService: NgbModal,
      private _httpService : HttpService
      ) { 
      this.getData((data) => {
        this.data = data;
      });
    }
    ngOnInit(){
      //this.loadRoles();
    }
    
    public getData(data) {
      const req = new XMLHttpRequest();
      req.open('GET', 'assets/data/clerks.json');
      req.onload = () => {
        data(JSON.parse(req.response));
      };
      req.send();
    }
   
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

    open() {
        // const modalRef = this.modalService.open(ModalComponent);
        this.modalOption= {
          backdrop : 'static',
          keyboard : false
        }
        const modalRef = this.modalService.open(AddcourtOfficialComponent, this.modalOption);
        modalRef.componentInstance.title = 'AddUser';
      }
}