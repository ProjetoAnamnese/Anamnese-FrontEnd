import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subject} from "rxjs";
import {FormBuilder, FormGroup} from "@angular/forms";
import {PacientService} from "../../../service/pacients.service";
import {MessageService} from "../../../../../shared/services/message.service";
import {UF_LIST} from "../../../../../shared/model/LIST_UF";
import {SelectOption} from "../../../../../shared/interface/SelectOption";

@Component({
  selector: 'app-manage-pacient',
  templateUrl: './manage-pacient.component.html',
  styleUrls: ['./manage-pacient.component.scss']
})
export class ManagePacientComponent implements OnInit , OnDestroy {
  private destroy$ = new Subject<void>();
  isLoading = false
  filterPacientForm !: FormGroup
  ufs: SelectOption[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private pacientService: PacientService,
    private messageService: MessageService ) {
  }
  ngOnInit(): void {
        this.loadInstances()
    }


    getPacients(): void {
      console.log("get pacients")
    }

    clearForm(){
      this.filterPacientForm.reset()
      this.getPacients()
    }
    loadInstances(){
     this.filterPacientForm = this.formBuilder.group({
       username: ['',],
       email: [''],
       phone: [''],
       address: [''],
       uf: [''],
       gender: [''],
     })

      this.ufs = UF_LIST.map(state => ({
        value: state.sigla,
        label: state.sigla
      }));
    }

  ngOnDestroy(): void {
    this.destroy$.next()
    this.destroy$.complete();
  }

}
