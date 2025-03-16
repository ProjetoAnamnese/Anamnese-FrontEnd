import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {catchError, finalize, Subject, takeUntil, throwError} from "rxjs";
import {AuthService} from "../../service/auth.service";
import {MessageService} from "../../../../../shared/services/message.service";
import {HttpErrorResponse} from "@angular/common/http";

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

  constructor(private formBuilder: FormBuilder, private router: Router, private authService: AuthService, private messageService: MessageService) {
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
  loginWithGoogle(){
    console.log('nao implementado')
  }

  togglePasswordVisibility(){
    this.passwordVisible = !this.passwordVisible;
  }
  showResetPassword() {
    this.showingResetPassword = true;
    console.log("aqui o this.showingResetPassword", this.showingResetPassword)
  }
  requestResetPassword(){

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
