import { HttpService } from './../../../common/services/http.service';

import { Component, OnInit } from '@angular/core';
import  Swal from 'sweetalert2'

@Component({
  selector: 'app-view-bail',
  templateUrl: './view-bail.component.html',
  styleUrls: ['./view-bail.component.scss']
})
export class ViewBailComponent implements OnInit {
  Bail: string;
  bailDetails: any;
  bailData: any;
  defendantDetails: any;
  typeData: any;

  constructor( private _httpService: HttpService) { }

  ngOnInit() {
    this.loadBailDetails()   
  }
  public loadBailDetails(): any {
    this.Bail = localStorage.getItem('bailsData')
    this.bailDetails = JSON.parse(this.Bail)
    this.bailData = this.bailDetails.case.casedetails
    this.defendantDetails = this.bailDetails.case.defendant.map(item => item)
    //console.log(this.defendantDetails)
    let data = this.defendantDetails.map(item => item);
    data.forEach(element => {
      //console.log(element)
      this.typeData = element.arrestdetails ? element.arrestdetails.type : '';
      console.log(this.typeData)

    });
    console.log()
    // this.defendantDetails.forEach(element => {
    //   this.arrestDetails= element

    // });
    //  console.log(this.arrestDetails)
    //this.complainantDetails = this.caseDetails.case.complainant.map(item => item)

  }
 
}
