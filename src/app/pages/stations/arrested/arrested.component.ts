import  Swal  from 'sweetalert2';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ArrestedService } from './arrested.service';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { HttpService } from '../../common/services/http.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-arrested',
  templateUrl: './arrested.component.html',
  styleUrls: ['./arrested.component.scss'],
  encapsulation: ViewEncapsulation.None,
  providers: [ArrestedService]
})
export class ArrestedComponent implements OnInit {
  public modalRef: NgbModalRef;
  public _parameters: any;
  public _id: any;
  public dataSet: any;
  public data = [];
  arrestedSet: any
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
        // { name: 'release', title: '<i class="fa fa-user"></i>&nbsp;&nbsp;' },
        { name: 'releaseMember', title: '<span class="btn btn-primary btn-sm"><i class="fa fa-award">&nbsp;Release</i></span>&nbsp;' },
       // { name: 'cellOccupancy', title: '<span class="btn btn-success btn-sm"><i class="fa fa-award">&nbsp;Release</i></span>' },
        // { name: 'updaterecord', title: '&nbsp;&nbsp;<i class="fa  fa-pencil"></i>&nbsp;&nbsp;' }
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
      caseid: {
        title: 'Case',
      },
     
      name: {
        title: 'Name',
        type: 'string'
      },
      nationalid: {
        title: 'ID',
        type: 'string',
        
      },
      email: {
        title: 'Email',
        type: 'string',
        
      },
      phonenumber: {
        title: 'Phone',
        type: 'string',
        
      },
    
      // age: 54
      // arrestdetails:
      //     cellid: 11
      //     released: false
      // __proto__: Object
      // caseid: 33
      // casememberid: 119
      // email: "mugr@gmail.com"
      // name: "mugr"
      // nationalid: 35537388
      // phonenumber: 254705319689
    },
    pager: {
      display: true,
      perPage: 5
    },
  };
  commandInterface: { request_type: string; client_type: { "useragentversion": string; "useragent": string; }; session_data: { this: any; }; onDeleteConfirm(event: any): void; openModal(formData: any): void; onRowSelect(event: any): void; onUserRowSelect(event: any): void; onRowHover(event: any): void; releaseMember(data: any): void; onCustomAction(event: any): void; };
  constructor(
    private _activatedRoute: ActivatedRoute,
    private _httpService: HttpService,
    private router: Router) {
    //this.getDefendants();
  }
  
  ngOnInit() {
   // this.cellOccupancy();
    this.arrestedMembers();
    this._parameters = this._activatedRoute.params.subscribe(params => {
      if (typeof params['id'] !== 'undefined') {
        this._id = params['id'];
      }
    });
  }
  public arrestedMembers(): any {
    this._httpService.get('retrievearrests').subscribe(
      result => {
       //console.log(result)
       this.arrestedSet= result.data.detained.map(detained=> detained);
       console.log(this.arrestedSet)
      },
      error => {

      },
      complete => {

      }
    )
  }
  cellOccupancy(data: any){
    console.log(data.arrestdetails.cellid)
    // this.commandInterface = {
    //   request_type: 'celloccupancy',
    //   client_type: {
    //     "useragentversion": "android kit kat",
    //     "useragent": "android"
    //   },
    //   session_data: {
    //     cellid: 4

    //   }
    // }
    //this._httpService.get('retrievearrests').subscribe(id => {
      //console.log(id)
    this._httpService.get('celloccupancy?cellid=' + data.arrestdetails.cellid)
    .subscribe(res=>{
      console.log(res)
    })
  }
    


  public onDeleteConfirm(event): void {
    if (window.confirm('Are you sure you want to delete?')) {
      event.confirm.resolve();
    } else {
      event.confirm.reject();
    }
  }

  public openModal(formData) {

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

  private releaseMember(data: any) {
    console.log (data)
   Swal.fire({
    title: 'Release&nbsp;&nbsp;<span> <small class= "fa-green">' + data.name + '</small></span> ?',
    text:    data.name
     + ' will be fully released from records once you decide to continue with this action  ',
    type: 'question',
    input: 'textarea',
    inputPlaceholder: 'Remarks',
    showLoaderOnConfirm: true,
    showCancelButton: true,
    confirmButtonColor: '#4cae4c',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Yes, release member!',
    preConfirm: () => {
      return data.name
    }

   })
  }

  public onCustomAction(event: any): void {
   
    switch (event.action) {
      case 'releaseMember':
        this.releaseMember(event.data);
        break;
      case 'cellOccupancy':
        this.cellOccupancy(event.data);
        break;
      default:
        break;
    }
  }

}
