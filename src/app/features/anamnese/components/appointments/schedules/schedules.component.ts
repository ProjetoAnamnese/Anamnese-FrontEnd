import {Component, OnDestroy, OnInit} from '@angular/core';
import {catchError, finalize, Subject, takeUntil, throwError} from "rxjs";
import {MessageService} from "../../../../../shared/services/message.service";
import {ScheduleService} from "../../../service/schedule.service";
import {HttpErrorResponse} from "@angular/common/http";
import {AppointmentResponse} from "../../../../../shared/dtos/schedules/AppointmentResponse";

@Component({
  selector: 'app-schedules',
  templateUrl: './schedules.component.html',
  styleUrls: ['./schedules.component.scss']
})
export class SchedulesComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>();
  isLoading: boolean = false
  schedulesData !: AppointmentResponse[]

  constructor(private messageService: MessageService, private scheduleService: ScheduleService) {
  }

  ngOnInit(): void {
    this.getProfissionalSchedules()
  }

  getProfissionalSchedules() {
    this.scheduleService.getProfissionalAppointment()
      .pipe(
        takeUntil(this.destroy$),
        finalize(() => this.isLoading = false),
        catchError((err: HttpErrorResponse) => {
          const errorMessage = err.error?.message || 'Erro ao criar horario';
          console.log(err);
          this.messageService.errorMessage(errorMessage);
          return throwError(() => err);
        })
      ).subscribe((res) =>{
        console.log('res', res);
        this.schedulesData = res
    })
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

}
