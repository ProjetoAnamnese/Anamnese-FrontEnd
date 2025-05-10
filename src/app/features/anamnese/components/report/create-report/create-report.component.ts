import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subject} from "rxjs";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {UF_LIST} from "../../../../../shared/model/LIST_UF";

@Component({
  selector: 'app-create-report',
  templateUrl: './create-report.component.html',
  styleUrls: ['./create-report.component.scss']
})
export class CreateReportComponent implements OnInit, OnDestroy{

  createReportForm !: FormGroup;
  isLoading: boolean = false;

  private destroy$ = new Subject<void>();

  constructor(private formBuilder: FormBuilder, ) {
  }
  ngOnInit(): void {
        this.loadInstances()
    }

    handleCreateReport(): void {
      console.log('aqui o report', this.createReportForm.value);
    }

    clearForm(): void {
      this.createReportForm.reset();
    }


  private loadInstances() {
    this.createReportForm = this.formBuilder.group({
      medicalHistory: ['', Validators.required],
      currentMedications: ['', Validators.required],
      cardiovascularIssues: [false],
      diabetes: [false],
      familyHistoryCardiovascularIssues: [false],
      familyHistoryDiabetes: [false],
      physicalActivity: ['', Validators.required],
      smoker: [false],
      alcoholConsumption: [0, [Validators.required, Validators.min(0), Validators.max(10)]],
      emergencyContactName: ['', Validators.required],
      emergencyContactPhone: ['', [Validators.required, Validators.pattern(/^\(\d{2}\) \d{4,5}-\d{4}$/)]],
      observations: ['']
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

}
