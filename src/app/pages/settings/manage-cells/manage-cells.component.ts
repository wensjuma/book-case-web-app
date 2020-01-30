import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CellsModalComponent } from './cells-modal/cells-modal.component';


@Component({
  selector: 'app-manage-cells',
  templateUrl: './manage-cells.component.html',
  styleUrls: ['./manage-cells.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ManageCellsComponent {

  public data = [];
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
      cellId: {
        title: 'Police ID',
        editable: false,
        width:'60px',
        type: 'html',
        valuePrepareFunction: (value) => { return '<div class="text-center">' + value + '</div>'; }       
      },
      cellClass: {
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

  constructor(private modalService: NgbModal) { 
    this.getData((data) => {
      this.data = data;
    });
  }

  // open() {
  //   // const modalRef = this.modalService.open(ModalComponent);
  //   const modalRef = this.modalService.open(AddUserComponent);
  //   modalRef.componentInstance.title = 'AddUser';
  // }


  public getData(data) {
    const req = new XMLHttpRequest();
    req.open('GET', 'assets/data/celltype.json');
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


  openFormModal() {
    const modalRef = this.modalService.open(CellsModalComponent);
    
    modalRef.result.then((result) => {
      console.log(result);
    }).catch((error) => {
      console.log(error);
    });
  }
 
}
