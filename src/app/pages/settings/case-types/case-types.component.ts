import { Component, ViewEncapsulation } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators} from '@angular/forms';
import { CustomValidators } from 'ng2-validation';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { CaseModalComponent } from './case-modal/case-modal.component';
import { HttpService } from '../../common/services/http.service';

@Component({
  selector: 'app-case-types',
  templateUrl: './case-types.component.html',
  styleUrls: ['./case-types.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class CaseTypesComponent {
    public steps:any[];
    public accountForm:FormGroup;
    public personalForm:FormGroup;
    public paymentForm:FormGroup;
    public details:any = {};
    public showConfirm:boolean;
    public confirmed:boolean;
    public dataSet: any;

    public formData;
    public modalRef: NgbModalRef;
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
        //   { name: 'addUsers', title: '<i class="fa fa-users"></i>&nbsp;&nbsp;' }
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
        casetypeid: {
          title: 'ID',
          editable: false,
          width: '60px',
          type: 'string',
    
        },
        name: {
          title: 'Case Type',
          type: 'string',
          filter: true
        },
      },
      pager: {
        display: true,
        perPage: 10
      }
    };
  

    constructor(private formBuilder: FormBuilder,
                private modalService: NgbModal,
                private _httpService: HttpService
        ) { 
       this.getcaseTypes();
    }

    openFormModal() {
        const modalRef = this.modalService.open(CaseModalComponent);
        
        modalRef.result.then((result) => {
          console.log(result);
        }).catch((error) => {
          console.log(error);
        });
      }

      public getcaseTypes(): any {
        this._httpService.get('casetypes').subscribe(
          result => {
            console.log(result.status);
            if (result.status === 'success') {
              this.dataSet = result.data.cases;
            }
          },
          error => {
    
          },
          complete => {
    
          }
        )
      }
      
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

}
