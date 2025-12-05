import {Component, OnDestroy, OnInit} from '@angular/core';
import {catchError, finalize, Subject,  takeUntil, throwError} from "rxjs";
import {MessageService} from "../../../../../shared/services/message.service";
import {ScheduleService} from "../../../service/schedule.service";
import {HttpErrorResponse} from "@angular/common/http";
import {AppointmentResponse} from "../../../../../shared/dtos/schedules/AppointmentResponse";
import {FormBuilder, FormGroup} from "@angular/forms";
import {NzModalService} from "ng-zorro-antd/modal";

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

  constructor(private messageService: MessageService, private scheduleService: ScheduleService, private formBuilder: FormBuilder, private modalService: NzModalService) {
  }

  ngOnInit(): void {
    this.loadInstances()
    this.getProfissionalSchedules()
  }

  getProfissionalSchedules() {
    this.scheduleService.getProfissionalAppointment(this.filterSchedulesForm.value)
      .pipe(
        takeUntil(this.destroy$),
        finalize(() => this.isLoading = false),
        catchError((err: HttpErrorResponse) => {
          const errorMessage = err.error?.message || 'Erro ao obter consultas';
          console.log(err);
          this.messageService.errorMessage(errorMessage);
          return throwError(() => err);
        })
      ).subscribe((res: any) => {
      this.totalSchedules = res.totalCount
      this.schedulesData = res.items
    })
  }

  handleCancelSchedule(scheduleId: number, isCanceled: boolean) {
      this.modalService.confirm({
        nzTitle: "Atenção!",
        nzContent: "Desja cancelar essa consulta?",
        nzOnOk: () => {
          this.updateSchedule(scheduleId, isCanceled)
        }
      });
  }


  updateSchedule(scheduleId: number, isCanceled: boolean) {
    this.scheduleService.updatedSchedule(scheduleId, {isCanceled: isCanceled})
      .pipe(takeUntil(this.destroy$),
        finalize(() => this.isLoading = false),
        catchError((err: HttpErrorResponse) => {
          const errorMessage = err.error?.message || 'Erro ao atualizar';
          console.log(err);
          this.messageService.errorMessage(errorMessage);
          return throwError(() => err);
        })
      ).subscribe(() =>{
        this.messageService.successMessage('Consulta cancelada com sucesso!')
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
  clearForm(){
    this.filterSchedulesForm.reset()
  }

  private loadInstances() {
    this.filterSchedulesForm = this.formBuilder.group({
      isCanceled: [false]
    })
  }


  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

}
