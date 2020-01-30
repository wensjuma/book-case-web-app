import { BookCourtComponent } from './../book-court/book-court.component';
import { BookToCourtComponent } from './book-to-court/book-to-court.component';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import Swal from 'sweetalert2';
import { HttpService } from 'src/app/pages/common/services/http.service';
import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { RouterModule, Router } from '@angular/router';


@Component({
  selector: 'app-bails-pending-approval',
  templateUrl: './bails-pending-approval.component.html',
  styleUrls: ['./bails-pending-approval.component.scss']
})
export class BailsPendingApprovalComponent implements OnInit {
  bailApplications: any;
  bailType: any;
  pendingBails: any;
  item: any;
  modalRef: NgbModalRef
  public settings = {
    actions: {
      columnTitle: 'Actions',
      add: false,
      edit: false,
      delete: false,
      custom: [
        // { name: 'approveBail', title: '<span class="btn btn-success  btn-sm"><i class=""></i>Approve</span>&nbsp;' },
        //{ name: 'rejectBail', title: '<span class="btn btn-danger btn-sm"><i class=""></i>Reject</span>' },
        { name: 'bookTocourt', title: '<span class="btn btn-primary btn-sm">Book&nbsp;to&nbsp;court</span>' },
        // { name: 'bookCourt', title: '<i class="fa fa-legal"></i>'},
        ///{ name: 'updateRecord', title: '&nbsp;&nbsp;<i class="fa  fa-pencil"></i>&nbsp;&nbsp;' }
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
    noDataMessage: 'Loading ...',
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
      amount: {
        title: "Amount",
        type: 'string',
        valuePrepareFunction: (evidence, trip) => {
          return `${trip.arrestdetails.amount}`;
        }
      }
    },
    pager: {
      display: true,
      perPage: 8

    }
  };
  courts: any;
  constructor(
    private modalService: NgbModal,
    private _httpService: HttpService,
    private toastr: ToastrService,
    private router: Router,
    
  ) {
  }
  ngOnInit() {
    this.pendingBailApprovals()
    this.retrieveBails()
    this.getCourts()
    //this.getCases()
  }
  dataSet: any;
  public retrieveBails() {
    this._httpService.get('retrievebails')
      .subscribe(result => {
        this.dataSet = result.data.bail.map(data => data)
      })
  }
 bookToCourt(data: any):void {
    this.modalRef = this.modalService.open(BookToCourtComponent);
  }
  public getCourts() {
    this._httpService.get('getcourts')
      .subscribe(res => {
        this.courts = res.data.courts.map(item => item.name);

      });
  }
  private viewRecord(data: any) {
    this.router.navigate(['/bails', data.caseid], { skipLocationChange: true });
    localStorage.setItem('bailsData', JSON.stringify(data))
  }
  public pendingBailApprovals() {

    this._httpService.get('getcases')
      .subscribe(result => {

        result.data.cases.map(element => {
          element.case.defendant.map(item => item);

        });
      })


  }
  public rejectBail(data: any) {
    Swal.fire({
      title: "Reject Approval",
      text: "Approve " + data.name + " of case " + data.caseid,
      input: 'text',
      showCancelButton: true,
      confirmButtonColor: 'green'
    }).then((result) => {
      if (result.value) {
        Swal.fire('Result:' + result.value);
      }
    });
  }
  public approveBail(data: any) {
   
   // let modalRef = this.modalService.open(BookCourtComponent)
    // Swal.fire({
    //   title: "Approve bail",
    //   text: "Approve bail of "+data.name+" under case " +data.caseid,
    //   type: 'question',
    //   input: 'textarea',
    //   showCancelButton: true,
    //   confirmButtonColor: 'green',
    //   cancelButtonColor: 'red',
    //   inputPlaceholder: "Write your remarks here ...",
    //   showLoaderOnConfirm: true,
    //   confirmButtonText: 'Yes, release member!',
    //   ///animation:  "slide-from-top",
    // }).then((result) => {
    //   if (result.value) {
    //     Swal.fire('Success!');
    //   }
    // });

  }
  updateRecord(data: any){
  
     //this.modalService.open(BookCourtComponent)
  }

  public onCustomAction(event: any): void {
    this.bookToCourt(event.data);    
  }
}
