import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from "../../service/auth.service";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { NzModalRef } from 'ng-zorro-antd/modal';
import {Subject} from "rxjs";

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
    private authService: AuthService,
    private formBuilder: FormBuilder,
  ) {}

  ngOnInit(): void {
    this.loadInstances();
  }

  togglePasswordVisibility() {
    this.passwordVisible = !this.passwordVisible;
  }

  createUser() {
    if (this.createUserForm.valid) {
      this.isLoading = true;
      const createUserValue = this.createUserForm.value;
      console.log('Usuário cadastrado:', this.createUserForm.value);
    }
  }

  private loadInstances() {
    this.createUserForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      specialty: ['', Validators.required]
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
