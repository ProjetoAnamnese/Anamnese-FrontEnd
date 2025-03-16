import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {Subject} from "rxjs";

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

  constructor(private formBuilder: FormBuilder, private router: Router) {
  }

  ngOnInit(): void {
        this.loadInstances()
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
