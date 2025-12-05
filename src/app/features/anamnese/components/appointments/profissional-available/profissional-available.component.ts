import {Component, OnDestroy, OnInit} from '@angular/core';
import {ProfissionalAvailableService} from "../../../service/profissional-available.service";
import {catchError, finalize, Subject, takeUntil, throwError} from "rxjs";
import {HttpErrorResponse} from "@angular/common/http";
import {MessageService} from "../../../../../shared/services/message.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {
  ProfissionalAvailableResponse
} from "../../../../../shared/dtos/profissional-available/profissionalAvailableResponse";

@Component({
  selector: 'app-profissional-available',
  templateUrl: './profissional-available.component.html',
  styleUrls: ['./profissional-available.component.scss']
})
export class ProfissionalAvailableComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>();
  isLoading: boolean = false
  showModalCreateAvailable: boolean = false;
  showModalEditAvailable: boolean = false;
  totalAvailableData!: number;
  profissionalAvailableData!: ProfissionalAvailableResponse[];
  selectedAvailability!: ProfissionalAvailableResponse;
  disponibilityForm = this.formBuilder.group({
    dayOfWeek: ["", Validators.required],
    startTime: [null, Validators.required],
    endTime: [null, Validators.required]
  }, {validators: this.timeDifferenceValidator});

  disponibilityEditForm = this.formBuilder.group({
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
  openEditAvailableModal(selectedAvailability: ProfissionalAvailableResponse): void {
    this.selectedAvailability = selectedAvailability;

    const [startHours, startMinutes] = selectedAvailability.startTime.split(':').map(Number);
    const [endHours, endMinutes] = selectedAvailability.endTime.split(':').map(Number);

    this.disponibilityEditForm.patchValue({
      startTime: new Date(1970, 0, 1, startHours, startMinutes),
      endTime: new Date(1970, 0, 1, endHours, endMinutes)
    });

    this.showModalEditAvailable = true;
  }


  closeEditAvailableModal(): void {
    this.showModalEditAvailable = false;
    this.getProfissionalAvailable()
  }
  closeCreateAvailableModal(): void {
    this.showModalCreateAvailable = false;
    this.getProfissionalAvailable()
  }


  getProfissionalAvailable() {
    this.profissionalAvailableService.getProfissionalAvailable()
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
        this.totalAvailableData = res.length
        this.profissionalAvailableData = res

      })

  }

  editProfissionalAvailable() {
    const startTime = this.disponibilityEditForm.value.startTime;
    const endTime = this.disponibilityEditForm.value.endTime;
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
    const availabilityId = this.selectedAvailability.profissionalAvailableId

    this.profissionalAvailableService.editProfissionalAvailability(availabilityId, {startTime: startTimeFormatted, endTime: endTimeFormatted})
      .pipe(
        takeUntil(this.destroy$),
        finalize(() => this.isLoading = false),
        catchError((err: HttpErrorResponse) => {
          const errorMessage = err.error?.message || 'Erro ao editar horario';
          console.log(err);
          this.messageService.errorMessage(errorMessage);
          return throwError(() => err);
        })
      ).subscribe(() =>{
        this.messageService.successMessage('Horário editado com sucesso!');
        this.closeEditAvailableModal();
    })
  }
  deleteAvailable(id: number): void {
    this.profissionalAvailableService.deleteProfissionalAvailability(id).subscribe({
      next: () => {
        this.profissionalAvailableData = this.profissionalAvailableData.filter(x => x.profissionalAvailableId !== id);
        this.messageService.successMessage('Horário excluído!');
      },
      error: () => {
        this.messageService.errorMessage('Erro ao excluir!');
      }
    });
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
      ).subscribe(() =>{
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
