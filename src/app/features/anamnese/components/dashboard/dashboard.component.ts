import {Component, OnDestroy, OnInit} from '@angular/core';
import {catchError, Subject, throwError} from "rxjs";
import {UserService} from "../../service/user.service";
import {HttpErrorResponse} from "@angular/common/http";
import {MessageService} from "../../../../shared/services/message.service";
import {ReportsService} from "../../service/reports.service";
import {PacientService} from "../../service/pacients.service";
import {ScheduleService} from "../../service/schedule.service";

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
  reportsByMonth!: {}


  constructor(
    private userService: UserService,
    private reportService: ReportsService,
    private scheduleService: ScheduleService,
    private pacientService: PacientService,
    private messageService: MessageService) {
  }

  ngOnInit(): void {
    this.countNextAppointments()
    this.countByGender()
    this.countReportByMonth()
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
  countNextAppointments() {
    this.scheduleService.countNextOfTheDay()
      .pipe(
        catchError((err: HttpErrorResponse) => {
          const errMessage = err.error?.message || 'Erro ao contar pacientes!';
          this.messageService.errorMessage(errMessage)
          return throwError(() => err);
        })
      ).subscribe((res) => {
      console.log('proximos dos dias', res)
    })
  }


  countByGender() {
    this.pacientService.countByGender()
      .pipe(
        catchError((err: HttpErrorResponse) => {
          const errMessage = err.error?.message || 'Erro ao contar pacientes!';
          this.messageService.errorMessage(errMessage)
          return throwError(() => err);
        })
      ).subscribe((res) => {
      console.log('COUNT BY GENDER', res)
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

  countReportByMonth() {
    this.reportService.countByMonth()
      .pipe(
        catchError((err: HttpErrorResponse) => {
          const errMessage = err.error?.message || 'Erro ao contar fichar por mêS!';
          this.messageService.errorMessage(errMessage)
          return throwError(() => err);
        })
      )
      .subscribe((res) => {
        this.reportsByMonth =  res
      })
  }


  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

}
