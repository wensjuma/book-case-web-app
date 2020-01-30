import { Component, OnInit } from '@angular/core';
import { NgbModalConfig, NgbModal, NgbModalRef, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { HttpService } from 'src/app/pages/common/services/http.service';
import { Router } from '@angular/router';
import { PaymentsComponent } from '../payments/payments.component';
import { BookCellComponent } from '../book-cell/book-cell.component';
import { ThrowStmt } from '@angular/compiler';

@Component({
  selector: 'app-view-arrested',
  templateUrl: './view-arrested.component.html',
  styleUrls: ['./view-arrested.component.scss']
})
export class ViewArrestedComponent implements OnInit {
  public modalRef: NgbModalRef;
  public formData;
  private modalOption: NgbModalOptions
  defendantsData: any;
  defendantDetails: any;
  arrested:any;
  

  constructor(
    config: NgbModalConfig,
     private _httpService: HttpService, 
     private modalService: NgbModal, 
     private router: Router,
    
  ) { }

  ngOnInit() {
    this.getDefendants()
  }
  public getDefendants(): any {
  this.defendantsData=localStorage.getItem('arrested')
  this.defendantDetails= JSON.parse(this.defendantsData);
  this.arrested =this.defendantDetails.defendant.map(element=> element)
  console.log(this.defendantDetails)
  console.log(this.arrested)
  }
  
  public openModal(event: any, member_id) {
    
    this.modalOption= {
      backdrop : 'static',
      keyboard : false
    }
    this.modalRef = this.modalService.open(PaymentsComponent, this.modalOption);
    this.arrested.forEach(element => {
      if(element.casememberid=== member_id){
         this.formData= element;
        }
    });
    this.modalRef.componentInstance.formData = this.formData;
    this.modalRef.componentInstance.caseInfo= this.defendantDetails;
    console.log(this.defendantDetails)
    this.modalRef.result.then((result) => {
      if (result === 'success') {
       // this.loadData();
      }
    }, (reason) => {
    });
  }

  public opensModal(formData) {
    this.formData = formData;
    this.modalOption= {
      backdrop : 'static',
      keyboard : false
    }
    this.modalRef = this.modalService.open(BookCellComponent, this.modalOption);
    if (formData) {
      this.modalRef.componentInstance.title = 'Edit Developer Info ';
    } else {
      this.modalRef.componentInstance.title = 'Add Developer';
    }
    
    this.modalRef.componentInstance.formData = this.formData;
    this.modalRef.result.then((result) => {
      if (result === 'success') {
        // this.loadData();
      }
    }, (reason) => {
    });
  }

}
