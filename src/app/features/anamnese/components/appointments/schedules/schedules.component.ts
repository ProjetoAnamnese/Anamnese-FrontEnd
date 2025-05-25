import {Component, OnDestroy, OnInit} from '@angular/core';
import {catchError, finalize, Subject, takeUntil, throwError} from "rxjs";
import {MessageService} from "../../../../../shared/services/message.service";
import {ScheduleService} from "../../../service/schedule.service";
import {HttpErrorResponse} from "@angular/common/http";
import {AppointmentResponse} from "../../../../../shared/dtos/schedules/AppointmentResponse";
import {FormBuilder, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-schedules',
  templateUrl: './schedules.component.html',
  styleUrls: ['./schedules.component.scss']
})
export class SchedulesComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>();
  isLoading: boolean = false
  filterSchedulesForm!: FormGroup;
  schedulesData !: AppointmentResponse[]
  totalSchedules !: number
  showPagination: boolean = true;
  pageIndex = 1;
  pageSize = 10;

  constructor(private messageService: MessageService, private scheduleService: ScheduleService, private formBuilder: FormBuilder) {
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
      ).subscribe((res: any) =>{
        console.log('res', res);
        this.totalSchedules = res.totalCount
        this.schedulesData = res.items
    })
  }

  onPageIndexChange(pageIndex: number): void {
    this.pageIndex = pageIndex;
    this.getProfissionalSchedules()
  }

  onPageSizeChange(pageSize: number): void {
    this.pageSize = pageSize
    this.getProfissionalSchedules()
  }


  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

}
