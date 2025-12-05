import {Component, OnDestroy, OnInit} from '@angular/core';
import {catchError, finalize, Subject, takeUntil, throwError} from "rxjs";
import {FormBuilder, FormGroup} from "@angular/forms";
import {PacientService} from "../../../service/pacients.service";
import {MessageService} from "../../../../../shared/services/message.service";
import {HttpErrorResponse} from "@angular/common/http";
import {IPacient} from "../../../interfaces/IPacient";
import {ReportsService} from "../../../service/reports.service";
import {IReport} from "../../../interfaces/IReport";

@Component({
  selector: 'app-manage-report',
  templateUrl: './manage-report.component.html',
  styleUrls: ['./manage-report.component.scss']
})
export class ManageReportComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>();
  reportFilterForm !: FormGroup
  editReportForm!: FormGroup
  pacientsData !: IPacient[]
  reportsData !: IReport[]
  selectedReport!: IReport
  totalReports: number = 0
  isLoading: boolean = false
  showPagination: boolean = true;
  showEditReportModal: boolean = false
  pageIndex = 1;
  pageSize = 10

  constructor(
    private formBuilder: FormBuilder,
    private pacientService: PacientService,
    private reportService: ReportsService,
    private messageService: MessageService) {
  }

  ngOnInit(): void {
    this.loadInstances();
    this.getPacients();
    this.getReports()
  }


  getReports() {
    this.isLoading = true
    this.reportService.getAllReports(this.reportFilterForm.value).pipe(takeUntil(this.destroy$),
      finalize(() => this.isLoading = false),
      catchError((err: HttpErrorResponse) => {
        const errMessage = err.error?.message || 'Erro ao buscar fichas!';
        this.messageService.errorMessage(errMessage)
        return throwError(() => err);
      })
    ).subscribe((res) => {
      this.reportsData = res.items;
      this.totalReports = res.totalCount
    })
  }

  getPacients() {
    this.isLoading = true
    this.pacientService.getAllPacients().pipe(takeUntil(this.destroy$),
      finalize(() => this.isLoading = false),
      catchError((err: HttpErrorResponse) => {
        const errorMessage = err.error?.message || 'Erro ao buscar pacientes!';
        console.log(err);
        this.messageService.errorMessage(errorMessage);
        return throwError(() => err);
      })
    ).subscribe((res) => {
      this.pacientsData = res.items;
    })
  }

  handleUpdateReport() {
    this.isLoading = true
    this.reportService.editReport(this.selectedReport.reportId, this.editReportForm.value)
      .pipe(takeUntil(this.destroy$),
        finalize(() => this.isLoading = false),
        catchError((err: HttpErrorResponse) => {
          const errMessage = err.error?.message || 'Erro ao editar ficha!';
          console.log(err);
          this.messageService.errorMessage(errMessage);
          return throwError(() => err);
        }))
      .subscribe(() => {
        this.messageService.successMessage('Ficha atualizada com sucesso!')
        this.getReports()
        this.showEditReportModal = false
      })
  }

  openEditReportModal(report: IReport) {
    this.selectedReport = report
    this.editReportForm.patchValue(report)
    this.showEditReportModal = true
  }


  onPageIndexChange(pageIndex: number): void {
    this.pageIndex = pageIndex;
    this.getReports()
  }

  onPageSizeChange(pageSize: number): void {
    this.pageSize = pageSize
    this.getReports()
  }

  clearForm() {
    this.loadInstances()
    this.getReports()
  }

  private loadInstances() {
    this.reportFilterForm = this.formBuilder.group({
      pacientId: [''],
      familyHistoryCardiovascularIssues: [''],
      smoker: [''],
      diabetes: [''],
    })

    this.editReportForm = this.formBuilder.group({
      medicalHistory: [''],
      currentMedications: [''],
      cardiovascularIssues: [false],
      diabetes: [false],
      familyHistoryCardiovascularIssues: [false],
      familyHistoryDiabetes: [false],
      physicalActivity: [''],
      smoker: [false],
      alcoholConsumption: [0],
      emergencyContactName: [''],
      emergencyContactPhone: [''],
      observations: ['']
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next()
    this.destroy$.complete();
  }

}
