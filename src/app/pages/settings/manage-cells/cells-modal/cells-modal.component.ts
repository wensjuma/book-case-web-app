import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-cells-modal',
  templateUrl: './cells-modal.component.html',
  styleUrls: ['./cells-modal.component.scss']
})
export class CellsModalComponent implements OnInit {
  form: FormGroup;
  loading: boolean = false;
  constructor(
    public activeModal: NgbActiveModal,
    private formBuilder: FormBuilder,
    private toastService: ToastrService
  ) { }

  ngOnInit() {
    this.form = this.formBuilder.group({
      'celltype': ['', Validators.required]
    })
  }
  submitCellType() {
    this.loading = true
    this.toastService.success('successful', 'Success')

  }

  closeModal() {
    this.activeModal.close('Modal Closed');
  }

}
