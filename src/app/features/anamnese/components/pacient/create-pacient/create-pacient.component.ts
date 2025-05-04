import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subject} from "rxjs";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {SelectOption} from "../../../../../shared/interface/SelectOption";
import {UF_LIST} from "../../../../../shared/model/LIST_UF";

@Component({
  selector: 'app-create-pacient',
  templateUrl: './create-pacient.component.html',
  styleUrls: ['./create-pacient.component.scss']
})
export class CreatePacientComponent implements OnInit, OnDestroy{

  isLoading: boolean = false
  createUserForm!: FormGroup
  ufs: SelectOption[] = [];


  private destroy$ = new Subject<void>();
  constructor(private formBuilder: FormBuilder) {
  }
    ngOnInit(): void {
        this.loadInstances()
    }

    handleCreatePacient (){
      console.log('aqui os dados do paciente', this.createUserForm.value)
    }

    clearForm() {
      this.createUserForm.reset()
    }


    private loadInstances (){
      this.ufs = UF_LIST.map(state => ({
        value: state.sigla,
        label: state.sigla
      }));

      this.createUserForm = this.formBuilder.group({
        username: ['', Validators.required],
        email: ['', [Validators.email]],
        phone: ['', Validators.required],
        profession: [''],
        uf: ['', Validators.required],
        gender: ['', Validators.required],
        birth: ['', Validators.required],
      })
    }
  ngOnDestroy(): void {
    this.destroy$.next()
    this.destroy$.complete();
  }

}
