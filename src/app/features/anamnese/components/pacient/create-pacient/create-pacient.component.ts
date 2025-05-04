import { Component, OnDestroy, OnInit } from '@angular/core';
import { catchError, finalize, Subject, takeUntil, throwError } from "rxjs";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { SelectOption } from "../../../../../shared/interface/SelectOption";
import { UF_LIST } from "../../../../../shared/model/LIST_UF";
import { AddPacientRequest } from "../../../../../shared/dtos/pacient/AddPacientRequest";
import { PacientService } from "../../../service/pacients.service";
import { HttpErrorResponse } from "@angular/common/http";
import { MessageService } from "../../../../../shared/services/message.service";

@Component({
  selector: 'app-create-pacient',
  templateUrl: './create-pacient.component.html',
  styleUrls: ['./create-pacient.component.scss']
})
export class CreatePacientComponent implements OnInit, OnDestroy {

  isLoading: boolean = false;
  createPacientForm!: FormGroup;
  ufs: SelectOption[] = [];
  private destroy$ = new Subject<void>();

  constructor(
    private formBuilder: FormBuilder,
    private pacientService: PacientService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.loadInstances();
  }

  handleCreatePacient() {
    console.log('aqui os dados do paciente', this.createPacientForm.value);

    if (this.createPacientForm?.value && this.createPacientForm?.valid) {
      this.createPacientForm.get('birth')?.setValue(
        new Date(this.createPacientForm.value.birth).toISOString().split('T')[0]
      );

      this.isLoading = true;
      const requestPacient = this.createPacientForm?.value as AddPacientRequest;

      this.pacientService.createPacient(requestPacient)
        .pipe(
          takeUntil(this.destroy$),
          finalize(() => this.isLoading = false),
          catchError((err: HttpErrorResponse) => {
            const errorMessage = err.error?.message || 'Erro ao cadastrar paciente!';
            console.log(err);
            this.messageService.errorMessage(errorMessage);
            return throwError(() => err);
          })
        )
        .subscribe((res) => {
          console.log('CRIOU PACIENT AQUIA A RES', res);
          this.messageService.successMessage('Paciente cadastrado com sucesso!');
          this.clearForm();
        });
    }
  }

  clearForm() {
    this.createPacientForm.reset();
  }

  private loadInstances() {
    this.ufs = UF_LIST.map(state => ({
      value: state.sigla,
      label: state.sigla
    }));

    this.createPacientForm = this.formBuilder.group({
      username: ['', Validators.required],
      email: ['', [Validators.email]],
      phone: ['', Validators.required],
      address: ['', Validators.required],
      profession: [''],
      uf: ['', Validators.required],
      gender: ['', Validators.required],
      birth: ['', Validators.required],
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
