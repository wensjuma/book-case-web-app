import { HttpService } from './../../../../common/services/http.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-individual-details',
  templateUrl: './individual-details.component.html',
  styleUrls: ['./individual-details.component.scss']
})
export class IndividualDetailsComponent implements OnInit {
@Input() individualData: any;
  constructor(
    private activeModal: NgbActiveModal,
    private _httpService: HttpService
    ) { }

  ngOnInit() {
 
  }
 
  closeModal(){
    this.activeModal.close()
  }

}
