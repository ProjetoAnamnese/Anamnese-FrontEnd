import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { catchError, finalize, Subject, takeUntil, throwError } from 'rxjs';
import { PacientService } from '../../../service/pacients.service';
import { MessageService } from '../../../../../shared/services/message.service';
import { HttpErrorResponse } from '@angular/common/http';
import { IPacient } from '../../../interfaces/IPacient';
import {ReportsService} from "../../../service/reports.service";

@Component({
  selector: 'app-create-report',
  templateUrl: './create-report.component.html',
  styleUrls: ['./create-report.component.scss']
})
export class CreateReportComponent implements OnInit, OnDestroy {

  createReportForm!: FormGroup;
  isLoading: boolean = false;
  selectedPacienteId!: number;
  pacientsData!: IPacient[];

  private destroy$ = new Subject<void>();

  constructor(
    private formBuilder: FormBuilder,
    private pacientService: PacientService,
    private messageService: MessageService,
    private reportService: ReportsService
  ) {}

  ngOnInit(): void {
    this.loadInstances();
    this.getPacients();
  }



  private disableReportForm(): void {
    Object.keys(this.createReportForm.controls).forEach(key => {
      this.createReportForm.get(key)?.disable();
    });
  }

  private enableReportForm(): void {
    Object.keys(this.createReportForm.controls).forEach(key => {
      this.createReportForm.get(key)?.enable();
    });
  }

  onPacienteSelect(pacienteId: number | null): void {
    this.selectedPacienteId = pacienteId ?? 0;
    this.selectedPacienteId ? this.enableReportForm() : this.disableReportForm();
  }

  getPacients(): void {
    this.isLoading = true;
    this.pacientService.getAllPacients().pipe(
      takeUntil(this.destroy$),
      finalize(() => this.isLoading = false),
      catchError((err: HttpErrorResponse) => {
        const errorMessage = err.error?.message || 'Erro ao buscar pacientes!';
        console.log(err);
        this.messageService.errorMessage(errorMessage);
        return throwError(() => err);
      })
    ).subscribe((res) => {
      this.pacientsData = res.items.filter((p) => !p.report)
    });
  }

  handleCreateReport(): void {
    if (!this.selectedPacienteId) return;
      this.isLoading = true;
      this.reportService.createReport(this.selectedPacienteId, this.createReportForm.value)
        .pipe(takeUntil(this.destroy$),
        finalize(() => this.isLoading = false),
        catchError((err: HttpErrorResponse) => {
          const errMessage = err?.error?.message || "Erro ao cadastrar ficha!"
          this.messageService.errorMessage(errMessage)
          return throwError(() => err);
        })
        ).subscribe(() =>{
          this.messageService.successMessage('Ficha cadastrada com sucesso!')
          this.getPacients();
          this.clearForm()
      })
  }

  clearForm(): void {
    this.createReportForm.reset();
    this.disableReportForm();
    this.selectedPacienteId = 0;
  }

  // LOAD INSTANCES MOCKADOS!
  private loadInstances(): void {
    this.createReportForm = this.formBuilder.group({
      medicalHistory: ['Hipertensão controlada, histórico de asma na infância.', Validators.required],
      currentMedications: ['Losartana 50mg, uso diário.', Validators.required],
      cardiovascularIssues: [true],
      diabetes: [false],
      familyHistoryCardiovascularIssues: [true],
      familyHistoryDiabetes: [false],
      physicalActivity: ['Caminhada leve 3x por semana.', Validators.required],
      smoker: [false],
      alcoholConsumption: [2, [Validators.required, Validators.min(0), Validators.max(10)]],
      emergencyContactName: ['Luciana Gomes', Validators.required],
      emergencyContactPhone: ['(61) 91234-5678', [Validators.required, Validators.pattern(/^\(\d{2}\) \d{4,5}-\d{4}$/)]],
      observations: ['Paciente relata dificuldade para dormir em períodos de estresse.']
    });

    //   this.createReportForm = this.formBuilder.group({
    //     medicalHistory: ['', Validators.required],
    //     currentMedications: ['', Validators.required],
    //     cardiovascularIssues: [false],
    //     diabetes: [false],
    //     familyHistoryCardiovascularIssues: [false],
    //     familyHistoryDiabetes: [false],
    //     physicalActivity: ['', Validators.required],
    //     smoker: [false],
    //     alcoholConsumption: [0, [Validators.required, Validators.min(0), Validators.max(10)]],
    //     emergencyContactName: ['', Validators.required],
    //     emergencyContactPhone: ['', [Validators.required, Validators.pattern(/^\(\d{2}\) \d{4,5}-\d{4}$/)]],
    //     observations: ['']
    //   });

    this.disableReportForm();
  }


  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
