import { Component, ViewEncapsulation, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Counties } from '../models/counties';
import { AuthService } from '../../auth/services/auth.service';
import { GlobalService } from '../../common/services/global.service';
import { map } from 'rxjs/internal/operators/map';
import { County } from './counties';
import { countries } from '../../dashboard/dashboard.data';
import { DataSource } from 'ng2-smart-table/lib/data-source/data-source';
import { HttpService } from '../../common/services/http.service';

@Component({
  selector: 'app-manage-counties',
  templateUrl: './manage-counties.component.html',
  encapsulation: ViewEncapsulation.None
})
export class ManageCountiesComponent implements OnInit {
  private commandIntaface: any;
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
      id: {
        title: 'ID',
        editable: false,
        width: '60px',
        type: 'html',
        valuePrepareFunction: (value) => { return '<div class="text-center">' + value + '</div>'; }       
      },
      name: {
        title: 'County Name',
        type: 'string',
        filter: true
      },
    },
    pager: {
      display: true,
      perPage: 10
    }
  };
  dataSet: any;
  data: any;
  id: any;
  constructor(
    private modalService: NgbModal,
    private _httpService: HttpService,
    private authService: AuthService,
    private globalService: GlobalService
    ) { 
      // this.getCounties()
  }


  ngOnInit(): void {

   this.getCounties()
  }

  private getCounties(): any{
    this._httpService.get('counties').subscribe(
      result => {
        console.log(result);
        this.dataSet = result.data.counties; 
    },
    (err: HttpErrorResponse) => {
      if (err.error instanceof Error) {
        console.log("Client-side error occured.");
      } else {
        console.log("Server-side error occured.");
      }
    });
  }
  
// public addCounty() {
//     return this.http.get<Counties>(this.globalService.login).subscribe(
//       res => {
//         console.log(res);
//     },
//     (err: HttpErrorResponse) => {
//       if (err.error instanceof Error) {
//         console.log("Client-side error occured.");
//       } else {
//         console.log("Server-side error occured.");
//       }
//     });
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
  

}
