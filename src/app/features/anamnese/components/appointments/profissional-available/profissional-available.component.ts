import {Component, OnDestroy, OnInit} from '@angular/core';
import {ProfissionalAvailableService} from "../../../service/profissional-available.service";
import {catchError, finalize, Subject, takeUntil, throwError} from "rxjs";
import {HttpErrorResponse} from "@angular/common/http";
import {MessageService} from "../../../../../shared/services/message.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-profissional-available',
  templateUrl: './profissional-available.component.html',
  styleUrls: ['./profissional-available.component.scss']
})
export class ProfissionalAvailableComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>();
  isLoading: boolean = false
  showModalCreateAvailable: boolean = false;
  disponibilityForm = this.formBuilder.group({
    dayOfWeek: ["", Validators.required],
    startTime: [null, Validators.required],
    endTime: [null, Validators.required]
  }, {validators: this.timeDifferenceValidator});

  constructor(private profissionalAvailableService: ProfissionalAvailableService, private messageService: MessageService, private formBuilder: FormBuilder) {
  }

  ngOnInit(): void {
    this.getProfissionalAvailable()
  }

  openCreateAvailableModal(): void {
    this.showModalCreateAvailable = true;
  }
  closeCreateAvailableModal(): void {
    this.showModalCreateAvailable = false;
    this.getProfissionalAvailable()
  }


  getProfissionalAvailable() {
    this.profissionalAvailableService.getProfissionalAvailable(24)
      .pipe(
        takeUntil(this.destroy$),
        finalize(() => this.isLoading = false),
        catchError((err: HttpErrorResponse) => {
          const errorMessage = err.error?.message || 'Erro ao buscar seus horarios!';
          console.log(err);
          this.messageService.errorMessage(errorMessage);
          return throwError(() => err);
        }))
      .subscribe((res) => {
        console.log('aqui a res', res)

      })

  }

  createProfissionalAvailable() {
    const startTime = this.disponibilityForm.value.startTime;
    const endTime = this.disponibilityForm.value.endTime;
    const dayOfWeek = this.disponibilityForm.value.dayOfWeek;
    const startTimeFormatted = new Date(startTime).toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false
    });
    const endTimeFormatted = new Date(endTime).toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false
    });
    this.profissionalAvailableService.sendProfissionalAvailable(dayOfWeek, startTimeFormatted, endTimeFormatted)
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
      console.log('RES AO CRIAR', res)
      this.messageService.successMessage('Disponibilidade criada com sucesso')
      this.closeCreateAvailableModal()
    })
  }

  private timeDifferenceValidator(formGroup: FormGroup): { [key: string]: any } | null {
    const startTime = formGroup.get('startTime')?.value;
    const endTime = formGroup.get('endTime')?.value;

    if (!startTime || !endTime) {
      return null;
    }

    const start = new Date(`1970-01-01T${startTime}`);
    const end = new Date(`1970-01-01T${endTime}`);

    const diff = (end.getTime() - start.getTime()) / (1000 * 60 * 60);

    return diff > 8 ? {maxEightHours: true} : null;
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

}
