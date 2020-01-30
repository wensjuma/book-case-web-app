import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { HttpService } from '../../common/services/http.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-station-officers',
  templateUrl: './station-officers.component.html',
  styleUrls: ['./station-officers.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class StationOfficersComponent {
  public dataSet : any;
  public loading = false;
  public hasErrors = true;
  public errorMessages = [];
  public data = [];
  public settings = {
    selectMode: 'single',  //single|multi
    hideHeader: false,
    hideSubHeader: false,
    actions: {
      columnTitle: 'Actions',
      add: false,
      edit: false,
      delete: false,
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
      userid: {
        title: 'ID',
        editable: false,
        width: '60px',
        type: 'html',
        valuePrepareFunction: (value) => { return '<div class="text-center">' + value + '</div>'; }       
      },
      name: {
        title: 'First Name',
        type: 'string',
        filter: true
      },
      station_name: {
        title: 'Station',
        type: 'string'
      },
      nationalidnumber: {
        title: 'ID Number',
        type: 'string'
      },
      email: {
        title: 'E-mail',
        type: 'string'
      },
      rolename: {
        title: 'Role',
        type: 'number'
      }
    },
    pager: {
      display: true,
      perPage: 10
    }
  };

  constructor(private modalService: NgbModal,
    public  _httpService : HttpService
    ) { 
    // this.getData((data) => {
    //   this.data = data;
    // });
  }

  // public getData(data) {
  //   const req = new XMLHttpRequest();
  //   req.open('GET', 'assets/data/users.json');
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
   
  }

  public onUserRowSelect(event){
    //console.log(event);   //this select return only one page rows
  }

  public onRowHover(event){
    //console.log(event);
  }


  ngOnInit() {
    this.getStationsUsers();
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

  private getStationsUsers(): any{
    this._httpService.get('getusers').subscribe(
      result => {
        this.dataSet = result.data['station users'];
    },
    (err: HttpErrorResponse) => {
      if (err.error instanceof Error) {
        console.log("Client-side error occured.");
      } else {
        console.log("Server-side error occured.");
      }
    });
  }

}
