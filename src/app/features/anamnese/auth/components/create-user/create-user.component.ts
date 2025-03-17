import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from "../../service/auth.service";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { NzModalRef } from 'ng-zorro-antd/modal';
import {catchError, finalize, Subject, takeUntil, throwError} from "rxjs";
import {UserService} from "../../../service/user.service";
import {HttpErrorResponse} from "@angular/common/http";
import {MessageService} from "../../../../../shared/services/message.service";
import {CreateUserResponse} from "../../models/create-user-response";

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.scss']
})
export class CreateUserComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>();
  createUserForm!: FormGroup;
  passwordVisible: boolean = false;
  isLoading: boolean = true;

  constructor(
    private userService: UserService,
    private formBuilder: FormBuilder,
    private messageService: MessageService,
    private modal: NzModalRef
  ) {}

  ngOnInit(): void {
    this.loadInstances();
  }

  togglePasswordVisibility() {
    this.passwordVisible = !this.passwordVisible;
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
      email: ['gabrielosantosb@email.com', [Validators.required, Validators.email]],
      password: ['123456', [Validators.required, Validators.minLength(6)]],
      speciality: ['', Validators.required]
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
