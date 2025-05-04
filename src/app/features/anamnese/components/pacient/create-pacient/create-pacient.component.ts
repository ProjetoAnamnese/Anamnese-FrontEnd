import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subject} from "rxjs";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-create-pacient',
  templateUrl: './create-pacient.component.html',
  styleUrls: ['./create-pacient.component.scss']
})
export class CreatePacientComponent implements OnInit, OnDestroy{

  createUserForm!: FormGroup

  private destroy$ = new Subject<void>();
  constructor(private formBuilder: FormBuilder) {
  }
    ngOnInit(): void {
        this.loadInstances()
    }

    handleCreatePacient (){
      console.log('aqui os dados do paciente', this.createUserForm.value)
    }


    private loadInstances (){
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
