import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {catchError, finalize, Subject, takeUntil, throwError} from "rxjs";
import {AuthService} from "../../service/auth.service";
import {MessageService} from "../../../../../shared/services/message.service";
import {HttpErrorResponse} from "@angular/common/http";
import {CreateUserComponent} from "../create-user/create-user.component";
import {NzModalRef, NzModalService} from "ng-zorro-antd/modal";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>();
  loginForm!: FormGroup;
  requestPasswordForm!: FormGroup;
  passwordVisible = false
  isLoading = false
  loadingRequestPassword = false
  isChangingPassword = false;
  showingResetPassword = false;

  constructor(private formBuilder: FormBuilder,
              private router: Router,
              private modalService: NzModalService,
              private authService: AuthService,
              private messageService: MessageService) {
  }

  ngOnInit(): void {
        this.loadInstances()
    }


  login(){
    this.isLoading = true;
    const requestUser = this.loginForm.value;
    console.log('aqui o requestUser', requestUser)
    this.authService.authUser(requestUser)
      .pipe(takeUntil(this.destroy$),
        finalize(() => this.isLoading = false),
        catchError((err: HttpErrorResponse) =>{
          const errMessage = err.error?.message || 'Erro ao efetuar login!'
          this.messageService.errorMessage(errMessage)
          return throwError(() => err)
        })
        ).subscribe((res) =>{
          console.log('aqui a res', res)
    })
  }

  openSignUpModal(): void {
    const modal: NzModalRef<CreateUserComponent> = this.modalService.create({
      nzTitle: 'Cadastrar Usuário',
      nzContent: CreateUserComponent,
      nzWidth: 720,
      nzOkDisabled: true,
      nzOnOk: () => modal.componentInstance?.createUser(),
    });

    // Após o modal abrir, observa mudanças no status do form
    modal.afterOpen.subscribe(() => {
      const instance = modal.componentInstance;
      if (instance?.createUserForm) {
        instance.createUserForm.statusChanges.subscribe((status: string | null) => {
          modal.updateConfig({ nzOkDisabled: status !== 'VALID' });
        });
      }
    });
  }






  loginWithGoogle(){
    alert('nao implementado')
  }

  togglePasswordVisibility(){
    this.passwordVisible = !this.passwordVisible;
  }

  showResetPassword() {
    this.showingResetPassword = true;
    console.log("aqui o this.showingResetPassword", this.showingResetPassword)
  }


  requestResetPassword(){
    alert('nao implementado')
  }

   private loadInstances(){
    this.loginForm = this.formBuilder.group({
      email: ["", [Validators.required, Validators.email]],
      password: ["", Validators.required]
    })


     this.requestPasswordForm = this.formBuilder.group({
       requestEmail: ["", [Validators.required, Validators.email]],
     })
   }

  ngOnDestroy(): void {
    this.destroy$.next()
    this.destroy$.complete();
  }

}
