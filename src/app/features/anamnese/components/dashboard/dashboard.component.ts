import {Component, OnDestroy, OnInit} from '@angular/core';
import {catchError, finalize, Subject, throwError} from "rxjs";
import {UserService} from "../../service/user.service";
import {HttpErrorResponse} from "@angular/common/http";
import {MessageService} from "../../../../shared/services/message.service";
import {ReportsService} from "../../service/reports.service";
import {PacientService} from "../../service/pacients.service";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, OnDestroy {
  private destroy$: Subject<void> = new Subject<void>();
  isLoading: boolean = false;
  totalProfissionalPacients !: number
  totalReports !: number
  countByReports !: {
    comReport: number,
    semReport: number
  }


  constructor(
    private userService: UserService,
    private reportService: ReportsService,
    private pacientService: PacientService,
    private messageService: MessageService) {
  }

  ngOnInit(): void {
    this.countPacientsByReport()
    this.countProfissionalPacients()
    this.countReports()
  }

  countPacientsByReport() {
    this.pacientService.countByReport()
      .pipe(
        catchError((err: HttpErrorResponse) => {
          const errMessage = err.error?.message || 'Erro ao contar pacientes!';
          this.messageService.errorMessage(errMessage)
          return throwError(() => err);
        })
      ).subscribe((res) => {
      this.countByReports = res
    })
  }

  countProfissionalPacients() {
    this.userService.countProfissionalPacients()
      .pipe(
        catchError((err: HttpErrorResponse) => {
          const errMessage = err.error?.message || 'Erro ao contar pacientes!';
          this.messageService.errorMessage(errMessage)
          return throwError(() => err);
        })
      )
      .subscribe((res) => {
        this.totalProfissionalPacients = res
      })
  }

  countReports() {
    this.reportService.countReport()
      .pipe(
        catchError((err: HttpErrorResponse) => {
          const errMessage = err.error?.message || 'Erro ao contar fichas!';
          this.messageService.errorMessage(errMessage)
          return throwError(() => err);
        })
      )
      .subscribe((res) => {
        this.totalReports = res
      })
  }


  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

}
