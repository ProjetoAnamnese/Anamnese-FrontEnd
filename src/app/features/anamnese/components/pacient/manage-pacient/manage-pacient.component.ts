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
export class ManagePacientComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>();
  isLoading: boolean = false
  editPacientModal: boolean = false
  filterPacientForm !: FormGroup
  editPacientForm !: FormGroup
  pacientsData !: IPacient[]
  selectedPacient !: IPacient;
  ufs: SelectOption[] = [];
  totalPacients: number = 0
  showPagination: boolean = true;
  pageIndex = 1;
  pageSize = 10;

  constructor(
    private formBuilder: FormBuilder,
    private pacientService: PacientService,
    private messageService: MessageService) {
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
    ).subscribe((res) => {
      this.pacientsData = res.items;
      this.totalPacients = res.totalCount
    })
  }

  updatePacient() {
    this.isLoading = true
    console.log('AQUI O THIS.SELECTED', this.selectedPacient)
    this.pacientService.editPacient(this.editPacientForm.value, this.selectedPacient.pacientId).pipe(takeUntil(this.destroy$),
      finalize(() => this.isLoading = false),
      catchError((err: HttpErrorResponse) => {
        const errorMessage = err.error?.message || 'Erro ao editar paciente!';
        console.log(err);
        this.messageService.errorMessage(errorMessage);
        return throwError(() => err);
      })
    ).subscribe((res) => {
      this.getPacients();
      this.messageService.successMessage('Paciente atualizado com sucesso!');
      this.editPacientModal = false
    })
  }

  clearForm() {
    this.loadInstances()
    this.getPacients()
  }

  onPageIndexChange(pageIndex: number): void {
    this.pageIndex = pageIndex;
  }

  onPageSizeChange(pageSize: number): void {
    this.pageSize = pageSize
  }

  submitEdit() {
    console.log('editou')
  }

  openEditPacientModal(pacient: IPacient): void {
    this.selectedPacient = pacient;
    this.editPacientForm.patchValue(pacient)
    this.editPacientModal = true
  }

  loadInstances() {
    this.filterPacientForm = this.formBuilder.group({
      username: ['',],
      email: [''],
      phone: [''],
      address: [''],
      uf: [''],
      gender: [''],
    })

    this.editPacientForm = this.formBuilder.group({
      username: [''],
      phone: [''],
      email: [''],
      profession: [''],
      gender: [''],
      uf: [''],
      birth: [''],
      address: [''],
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
