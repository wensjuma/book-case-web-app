import { NgxNavigationWithDataComponent } from 'ngx-navigation-with-data';
import { map } from 'rxjs/operators';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { FormModalComponent } from '../form-modal/form-modal.component';
import { LocalDataSource } from 'ng2-smart-table';
import { ViewObrecordComponent } from './view-obrecord/view-obrecord.component';
import { HttpService } from '../../common/services/http.service';
import { AddMemberComponent } from './add-member/add-member.component';
//import { BookCourtComponent } from './book-court/book-court.component';
import { Router, ActivatedRoute } from '@angular/router';
import { pipe, config } from 'rxjs';

@Component({
  selector: 'app-ob-records',
  templateUrl: './ob-records.component.html',
  styleUrls: ['./ob-records.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ObRecordsComponent implements OnInit {
  public dataSet: any;
  public modalRef: NgbModalRef;
  public _parameters: any;
  public _id: any;
  public data = [];

  public settings = {
    actions: {
      columnTitle: 'Actions',
      add: false,
      edit: false,
      delete: false,
      custom: [
        { name: 'viewRecord', title: '<span class="btn btn-primary  btn-sm"><i class="fa fa-eye"></i>More</span>' },
        // { name: 'bookCourt', title: '<i class="fa fa-legal"></i>'},
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
        title: 'OB Number',
      },
      casetype: {
        title: 'Case Type',
      },
      charges: {
        title: 'Charges',
        type: 'string',
        
          valuePrepareFunction: (charges, trip) => {
            return `${trip.case.casedetails.charges}`;
          }
      },
      evidence: {
        title: 'Evidence',
        type: 'string',
        
          valuePrepareFunction: (evidence, trip) => {
            return `${trip.case.casedetails.evidence}`;
          }
      },
      // complainant: {
      //   title: 'Complainant',
      //   type: 'string',
      //   valuePrepareFunction: (value) => {
      //     return value.name;
      //   }
      // },
      // defendant: {
      //   title: 'Defendant',
       
      //     type: 'list',
          
      //       list: [
      //         {
      //           email: '',
      //           name: ''

      //         }
      //       ]
          
        
        // valuePrepareFunction: (value) => {
        //   // value.map(item => {
        //   //   item.value.defendant.map(item => item.name)
        //   // })
        //   return value.name;
        //  }

        // valuePrepareFunction: (value=> value.filter(item =>item.defendant instanceof Array) 
        // .map(item =>item.name))
        // valuePrepareFunction:(value) => {
        //  return value.map(item => item.value.defendant.map(item => item.name))
        // }

      


      //.map())


      // createdby: {
      //   title: 'Officer Assigned',
      // }
    },
    pager: {
      display: true,
      perPage: 8
    }
  };

  source: LocalDataSource;
  officer: any;

  constructor(private modalService: NgbModal,
    public _httpService: HttpService,
    public router: Router,
    private _activatedRoute: ActivatedRoute,
   
  ) {

    this.source = new LocalDataSource();
  }

  ngOnInit() {
    this._parameters = this._activatedRoute.params.subscribe(params => {
      if (typeof params['id'] !== 'undefined') {
        this._id = params['id'];
      }
    });
    this.getCases();
  }

  public getCases(): any {
    this._httpService.get('getcases').subscribe(
      result => {     
        this.dataSet = result.data.cases.map((rec) => {
         
          rec.defendant = rec.case.defendant != null ? rec.case.defendant.name : '';
          return rec;
        })   
        this.officer= this.dataSet.map(element => element.createdby)
         
        console.log(this.dataSet)
        
      /*Nice to meet the archives */
        // let defendants = this.dataSet.filter(item => item.case.defendant instanceof Array)
        //   .map(item => item.case.defendant)
        // console.log(defendants)
        // const options = [];
        // for (const defendant of defendants) {
        //   options.push({ email: defendant.map(item => item.email), name: defendant.map(item => item.name) });
        // }
        // this.settings.columns.defendant.list = options;
        // console.log(this.settings.columns.defendant.list)
        // Object.assign({}, this.settings.columns.defendant.list);
        // console.log(this.settings)
        // console.log(options)

        // this.settings.columns.defendant.editor.config.list = this.dataSet.filter(item => item.case.defendant instanceof Array)
        // .map(item => item.case.defendant)

        // const temp = []
        // d.forEach(item => {
        //   item.forEach(t2 => temp.push(t2))
        // }) 

        // console.log(d);
        // if (result.status === 'success') {
        //   this.dataSet = result.data.cases;
        // }
      },
      error => {

      },
      complete => {

      }
    )
  }

  openFormModal() {
    const modalRef = this.modalService.open(FormModalComponent);

    modalRef.result.then((result) => {
     
    }).catch((error) => {
      console.log(error);
    });
  }

  // public onCustom(event) {
  //   const modalRef = this.modalService.open(FormModalComponent);
  //    // this.modalRef.componentInstance.formData = formData;
  //    modalRef.result.then((result) => {
  //        console.log(result);
  //      }).catch((error)=>{
  //        console.log(error)
  //      }); 
  //  }

  onSearch(query: string = '') {
    this.source.setFilter([
      // fields we want to include in the search
      {
        field: 'id',
        search: query
      },
      {
        field: 'caseType',
        search: query
      },
      {
        field: 'fullname',
        search: query
      },
      {
        field: 'location',
        search: query
      }
    ], false);
  }

  private viewRecord(data: any) {
    
    this.router.navigate(['/stations', data.caseid],  { skipLocationChange:true } );
    localStorage.setItem('caseDetails',JSON.stringify(data))
  }

  public onCustomAction(event: any): void {

   
    switch (event.action) {
      case 'viewRecord':
        this.viewRecord(event.data);
        break;
      case 'editRecord':
        // this.openModal(event.data);
        break;
      default:
        break;
    }
  }

  public addMember(formData: any) {
    this.modalRef = this.modalService.open(AddMemberComponent);
    this.modalRef.componentInstance.formData = formData;
    this.modalRef.result.then((result) => {
      if (result === 'success') {
        // this.loadData();
      }
    }, (reason) => {
    });
  }

  public bookCourt(formData: any) {
    //this.modalRef = this.modalService.open(BookCourtComponent);
    this.modalRef.componentInstance.formData = formData;
    this.modalRef.result.then((result) => {
      if (result === 'success') {
        // this.loadData();
      }
    }, (reason) => {
    });
  }

  public updaterecord(formData: any) {
    this.modalRef = this.modalService.open(ViewObrecordComponent);
    this.modalRef.componentInstance.formData = formData;
    this.modalRef.result.then((result) => {
      if (result === 'success') {
        // this.loadData();
      }
    }, (reason) => {
    });
  }
}

