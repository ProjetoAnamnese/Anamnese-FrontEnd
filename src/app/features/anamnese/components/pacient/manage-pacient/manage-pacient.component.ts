import {Component, OnDestroy, OnInit} from '@angular/core';
import {catchError, finalize, Subject, takeUntil, throwError} from "rxjs";
import {FormBuilder, FormGroup} from "@angular/forms";
import {PacientService} from "../../../service/pacients.service";
import {MessageService} from "../../../../../shared/services/message.service";
import {UF_LIST} from "../../../../../shared/model/LIST_UF";
import {SelectOption} from "../../../../../shared/interface/SelectOption";
import {HttpErrorResponse} from "@angular/common/http";
import {IPacient} from "../../../interfaces/IPacient";

@Component({
  selector: 'app-manage-pacient',
  templateUrl: './manage-pacient.component.html',
  styleUrls: ['./manage-pacient.component.scss']
})
export class ManagePacientComponent implements OnInit , OnDestroy {
  private destroy$ = new Subject<void>();
  isLoading = false
  filterPacientForm !: FormGroup
  pacientsData !: IPacient[]
  ufs: SelectOption[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private pacientService: PacientService,
    private messageService: MessageService ) {
  }
  ngOnInit(): void {
        this.loadInstances()
        this.getPacients()
    }


    getPacients() {
      this.isLoading = true
      this.pacientService.getAllPacients(this.filterPacientForm.value).pipe(takeUntil(this.destroy$),
        finalize(() => this.isLoading = false),
        catchError((err: HttpErrorResponse) => {
          const errorMessage = err.error?.message || 'Erro ao buscar pacientes!';
          console.log(err);
          this.messageService.errorMessage(errorMessage);
          return throwError(() => err);
        })
      ).subscribe((res) =>{
        console.log("AQUI OS PACIENTES", res)
        this.pacientsData = res;
      })
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
