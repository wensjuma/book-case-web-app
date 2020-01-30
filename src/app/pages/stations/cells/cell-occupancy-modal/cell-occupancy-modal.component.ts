import { animate } from '@angular/animations';
import { IndividualDetailsComponent } from './individual-details/individual-details.component';
import { NgbActiveModal, NgbModal, NgbModalRef, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-cell-occupancy-modal',
  templateUrl: './cell-occupancy-modal.component.html',
  styleUrls: ['./cell-occupancy-modal.component.scss']
})
export class CellOccupancyModalComponent implements OnInit {
@Input() members: any;
@Input() eventData: any;
@Input() vaccants: any;
memberSet: any;
public settings = {
  selectMode: 'single',  // single|multi
  hideHeader: false,
  hideSubHeader: false,
  actions: {
    columnTitle: 'Actions',
    add: false,
    edit: false,
    delete: false,    
    custom: [
      { name: 'viewRecord', title: '<span class="btn btn-primary btn-sm"><i class="fa fa-eye"></i>&nbsp;View&nbspMember</span>' },
     
   ],
    position: 'right' // left|right
  },
  
  noDataMessage: 'Loading... ',
  columns: {
    name: {
      title: 'Name',
      type: 'string'
    },
    caseid: {
      title: 'Case',
      type: 'string'
    },
    casememberid: {
      title: 'Member ID',
      type: 'string'
    },
    phonenumber: {
      title: 'Phone No',
      type: 'string'
    },
    age:{
      title: 'Age',
      type: 'string'
    } ,
// arrestdetails:
//   cellid: 11
//   released: false
// __proto__: Object
// caseid: 33
// casememberid: 119
// email: "mugr@gmail.com"
// name: "mugr"
// nationalid: 35537388
// phonenumber: 25470531
     
    
email:{
      title: 'Status',
      type: 'string',
     // renderComponent: LabelActiveComponent   
    },
  },
  pager: {
    display: true,
    perPage: 5
  }
};
modalRef: NgbModalRef;
modalOptions: NgbModalOptions;
cellData: any;
  constructor(
    private activeModal: NgbActiveModal,
    private modalService: NgbModal
  ) { }

  ngOnInit() {
    this.listCellMembers();
   
   // console.log(this.members)
  }
  listCellMembers(){
   this.memberSet = this.members.data.guests.map(memberDetails=> memberDetails);
   console.log(this.memberSet)

  }
 
  viewRecord(data){
    //let modalRef= 
    this.cellData = data 
    console.log(this.cellData)
    this.modalOptions={
     // animated: true,
      keyboard:false,
      backdrop: 'static'
    }
  this.modalRef = this.modalService.open(IndividualDetailsComponent, this.modalOptions);
  this.modalRef.componentInstance.individualData = data;
  }
 

  closeModal(){
    this.activeModal.close();
  }
  onCustomAction(event: any){
    switch(event.action){
      case 'viewRecord':
        this.viewRecord(event.data);
        break
    }

  }

}
