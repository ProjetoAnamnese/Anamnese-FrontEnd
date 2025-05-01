import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { NzModalRef } from 'ng-zorro-antd/modal';
import {catchError, finalize, of, Subject, takeUntil, throwError} from "rxjs";
import {UserService} from "../../../service/user.service";
import {HttpErrorResponse} from "@angular/common/http";
import {MessageService} from "../../../../../shared/services/message.service";
import {CreateUserResponse} from "../../models/create-user-response";
import {SelectOption} from "../../../../../shared/interface/SelectOption";
import {STATES_LIST} from "../../../../../shared/utils/StatesList";

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.scss']
})
export class CreateUserComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>();
  createUserForm!: FormGroup;
  isLoading: boolean = true;
  states: SelectOption[] = [];

  constructor(
    private userService: UserService,
    private formBuilder: FormBuilder,
    private messageService: MessageService,
    private modal: NzModalRef
  ) {}

  ngOnInit(): void {
    this.loadInstances();
  }

  createUser(): Promise<CreateUserResponse> {
    return new Promise((resolve, reject) => {
      if (!this.createUserForm.valid) {
        reject("Formulário inválido");
        return;
      }

      this.isLoading = true;
      const createUserValue = this.createUserForm.value;

      this.userService.createUser(createUserValue)
        .pipe(
          takeUntil(this.destroy$),
          finalize(() => this.isLoading = false),
          catchError((err: HttpErrorResponse) => {
            console.error("Erro ao cadastrar:", err);
            this.messageService.errorMessage(err.error?.message || "Erro ao cadastrar usuário");
            reject(err);
            return throwError(() => err);
          })
        )
        .subscribe((res) => {
          console.log("Usuário criado:", res);
          this.messageService.successMessage('Usuário cadastrado com sucesso!');
          this.modal.close();
          resolve(res);
        });
    });
  }



  private loadInstances() {
    this.createUserForm = this.formBuilder.group({
      username: ['gabrielo', [Validators.required]],
      email: ['gabrielosantosb@gmail.com', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
      speciality: ['', Validators.required]
    });

    this.states = STATES_LIST.map(state => ({
      value: state.sigla,
      label: state.name
    }));
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  protected readonly of = of;
}
