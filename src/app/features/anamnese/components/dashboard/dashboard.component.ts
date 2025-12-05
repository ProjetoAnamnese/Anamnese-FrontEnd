import { Component, OnDestroy, OnInit } from '@angular/core';
import { catchError, Subject, throwError } from "rxjs";
import { ChartData, ChartOptions } from 'chart.js';
import { UserService } from "../../service/user.service";
import { HttpErrorResponse } from "@angular/common/http";
import { MessageService } from "../../../../shared/services/message.service";
import { ReportsService } from "../../service/reports.service";
import { PacientService } from "../../service/pacients.service";
import { ScheduleService } from "../../service/schedule.service";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, OnDestroy {
  private destroy$: Subject<void> = new Subject<void>();
  isLoading: boolean = false;

  totalProfissionalPacients!: number;
  totalReports!: number;
  countByReports!: { comReport: number, semReport: number };
  reportsByMonth!: {};
  nextAppointments: any[] = [];

  // Gráficos
  donutChartData!: ChartData<'pie'>;
  donutChartOptions!: ChartOptions<'pie'>;

  barChartData!: ChartData<'bar'>;
  barChartOptions!: ChartOptions<'bar'>;

  constructor(
    private userService: UserService,
    private reportService: ReportsService,
    private scheduleService: ScheduleService,
    private pacientService: PacientService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.countNextAppointments();
    this.countByGender();
    this.countReportByMonth();
    this.countPacientsByReport();
    this.countProfissionalPacients();
    this.countReports();
  }

  countByGender() {
    this.pacientService.countByGender()
      .pipe(
        catchError((err: HttpErrorResponse) => {
          this.messageService.errorMessage('Erro ao contar pacientes por gênero!');
          return throwError(() => err);
        })
      ).subscribe((res) => {
      this.donutChartData = {
        labels: Object.keys(res),
        datasets: [
          {
            data: Object.values(res),
            backgroundColor: ['#1890ff', '#40a9ff', '#69c0ff'],
            hoverOffset: 8
          }
        ]
      };

      this.donutChartOptions = {
        responsive: true,
        plugins: {
          legend: {
            position: 'bottom'
          }
        }
      };
    });
  }

  countReportByMonth() {
    this.reportService.countByMonth()
      .pipe(
        catchError((err: HttpErrorResponse) => {
          this.messageService.errorMessage('Erro ao contar fichas por mês!');
          return throwError(() => err);
        })
      )
      .subscribe((res) => {
        this.barChartData = {
          labels: Object.keys(res),
          datasets: [
            {
              label: 'Fichas',
              data: Object.values(res),
              backgroundColor: '#1890ff'
            }
          ]
        };

        this.barChartOptions = {
          responsive: true,
          plugins: {
            legend: {
              display: false
            }
          },
          scales: {
            x: {},
            y: { beginAtZero: true }
          }
        };
      });
  }

  countPacientsByReport() {
    this.pacientService.countByReport()
      .pipe(
        catchError((err: HttpErrorResponse) => {
          this.messageService.errorMessage('Erro ao contar pacientes com e sem ficha!');
          return throwError(() => err);
        })
      ).subscribe((res) => {
      this.countByReports = res;
    });
  }

  countNextAppointments() {
    this.scheduleService.countNextOfTheDay()
      .pipe(
        catchError((err: HttpErrorResponse) => {
          this.messageService.errorMessage('Erro ao buscar agendamentos!');
          return throwError(() => err);
        })
      ).subscribe((res) => {
      this.nextAppointments = res;
    });
  }

  countProfissionalPacients() {
    this.pacientService.getAllPacients()
      .pipe(
        catchError((err: HttpErrorResponse) => {
          this.messageService.errorMessage('Erro ao contar pacientes!');
          return throwError(() => err);
        })
      ).subscribe((res)=>{
        this.totalProfissionalPacients = res.totalCount
    })
  }

  countReports() {
    this.reportService.countReport()
      .pipe(
        catchError((err: HttpErrorResponse) => {
          this.messageService.errorMessage('Erro ao contar fichas!');
          return throwError(() => err);
        })
      ).subscribe((res) => {
      this.totalReports = res;
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
