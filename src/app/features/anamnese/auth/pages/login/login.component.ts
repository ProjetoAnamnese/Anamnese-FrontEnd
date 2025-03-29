import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { catchError, finalize, Subject, takeUntil, throwError } from "rxjs";
import { AuthService } from "../../service/auth.service";
import { MessageService } from "../../../../../shared/services/message.service";
import { HttpErrorResponse } from "@angular/common/http";
import { CreateUserComponent } from "../../components/create-user/create-user.component";
import { NzModalRef, NzModalService } from "ng-zorro-antd/modal";
import { CookieService } from "ngx-cookie-service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>();
  loginForm!: FormGroup;
  requestPasswordForm!: FormGroup;
  passwordVisible = false;
  isLoading = false;
  loadingRequestPassword = false;
  isChangingPassword = false;
  showingResetPassword = false;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private modalService: NzModalService,
    private authService: AuthService,
    private cookieService: CookieService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.loadInstances();
    this.userHasToken();
  }

  login(): void {
    this.isLoading = true;
    const requestUser = this.loginForm.value;

    this.authService.authUser(requestUser)
      .pipe(
        takeUntil(this.destroy$),
        finalize(() => this.isLoading = false),
        catchError((err: HttpErrorResponse) => {
          const errMessage = err.error?.message || 'Erro ao efetuar login!';
          this.messageService.errorMessage(errMessage);
          return throwError(() => err);
        })
      ).subscribe((res) => {
      console.log('Login tradicional - resposta:', res);
    });
  }

  loginWithGoogle(): void {
    const popup = this.authService.authWithGoogle();

    const listener = (event: MessageEvent) => {
      if (!event.origin.includes('localhost')) return;
      const user = event.data;
      if (user?.email) {
        console.log('Usuário logado via Google:', user);
        this.cookieService.set('USER_INFO', user.token || '');
        // this.router.navigate(['/dashboard']);
      }

      window.removeEventListener('message', listener);
      popup?.close();
    };

    window.addEventListener('message', listener);
  }

  openCreateUserModal(): void {
    const modal: NzModalRef<CreateUserComponent> = this.modalService.create({
      nzTitle: 'Cadastrar Usuário',
      nzContent: CreateUserComponent,
      nzWidth: 720,
      nzOkDisabled: true,
      nzOnOk: () => modal.componentInstance?.createUser(),
    });

    modal.afterOpen.subscribe(() => {
      const instance = modal.componentInstance;
      if (instance?.createUserForm) {
        instance.createUserForm.statusChanges.subscribe((status: string | null) => {
          modal.updateConfig({ nzOkDisabled: status !== 'VALID' });
        });
      }
    });
  }

  private userHasToken(): void {
    const token = this.authService.isLoggedIn();
    if (token) {
      console.log('Usuário já possui token no cookie:', token);
      // this.router.navigate(['/dashboard']); // descomente se quiser redirecionar automaticamente
    }
  }

  togglePasswordVisibility(): void {
    this.passwordVisible = !this.passwordVisible;
  }

  showResetPassword(): void {
    this.showingResetPassword = true;
    console.log("Exibindo formulário de reset de senha");
  }

  requestResetPassword(): void {
    alert('Funcionalidade ainda não implementada');
  }

  private loadInstances(): void {
    this.loginForm = this.formBuilder.group({
      email: ["", [Validators.required, Validators.email]],
      password: ["", Validators.required]
    });

    this.requestPasswordForm = this.formBuilder.group({
      requestEmail: ["", [Validators.required, Validators.email]],
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
