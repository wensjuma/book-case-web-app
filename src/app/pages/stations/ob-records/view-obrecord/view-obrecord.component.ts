import { PaymentsComponent } from './../../arrested/payments/payments.component';
import { HttpService } from 'src/app/pages/common/services/http.service';
import { BookCellComponent } from './../../arrested/book-cell/book-cell.component';
import { AddCaseMemberComponent } from './../../case-members/add-case-member/add-case-member.component';
import { Component, OnInit } from '@angular/core';
import { NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';



@Component({
  selector: 'app-view-obrecord',
  templateUrl: './view-obrecord.component.html',
  styleUrls: ['./view-obrecord.component.scss']
})
export class ViewObrecordComponent implements OnInit {
  caseDetails: any;
  defendantDetails: any;
  complainantDetails: any;
  caseInfo: any;
  Case: any;
  passData: any;
  caseData: any
  modalOptions: NgbModalOptions;
  arrestDetails: any;
  arrested: any;
  formData: any
  defendantsData: any
  defendant_details: any;
  searchComplainant: any;
  searchDefendant: any;


  constructor(
    private modalService: NgbModal,
    private _httpService: HttpService,
    private toast: ToastrService
  ) {
  }
  ngOnInit() {
    this.LoadCasesDetails();
    this.loadCaseMembers();
    this.getDefendants();
  }
  public loadCaseMembers() {
    this._httpService.get('getcasemembers')
      .subscribe(result => {
       
        return result
      })
  }
  public LoadCasesDetails(): any {
    this.Case = localStorage.getItem('caseDetails')
    this.caseDetails = JSON.parse(this.Case)
    this.caseData = this.caseDetails.case.casedetails
    this.defendantDetails = this.caseDetails.case.defendant.map(item => item)
   
    this.complainantDetails = this.caseDetails.case.complainant.map(item => item)
    

  }
  modalAddCaseMember(data) {

    // this.modalOptions={
    //   backdrop: 'static',
    //   keyboard:false
    // }
    const modalRef = this.modalService.open(AddCaseMemberComponent);
    modalRef.componentInstance.data = data;
 
  }
  public getDefendants(): any {
    this.defendantsData = localStorage.getItem('arrested')
    this.defendant_details =this.defendantDetails.map(item=>item.casememberid)
  }
  public applyBail(event: any, case_id, member_id) {
   
    this.modalOptions = {
      backdrop: 'static',
      keyboard: false
    }
    const modalRef = this.modalService.open(PaymentsComponent, this.modalOptions);
    if (this.defendant_details.casememberid === member_id) {
      this.formData = this.defendant_details;
     
    }
    modalRef.componentInstance.formData = this.formData;
    modalRef.componentInstance.caseInfo = case_id;
   
    modalRef.result.then((result) => {
      if (result.status === 'success') {
        this.loadCaseMembers()
        this.getDefendants()
      }
    }, (reason) => {
    });
  }
  bookToCell(event, member_id, case_id) {
    const modalRef = this.modalService.open(BookCellComponent);
    this.defendantDetails.forEach(element => {
      if (element.casememberid === member_id) {
        this.passData = element;
      }
    });
    modalRef.componentInstance.case = case_id;
    modalRef.componentInstance.data = this.passData;
    modalRef.result.then(result => {
      this.loadCaseMembers()
      this.LoadCasesDetails()
    })
  }
  removeMember() {
  }
}
