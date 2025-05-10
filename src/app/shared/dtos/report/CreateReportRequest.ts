export interface ReportRequest
{
  medicalHistory: string;
  currentMedications: string;
  cardiovascularIssues: boolean;
  address: string;
  diabetes: boolean;
  familyHistoryCardiovascularIssues: boolean;
  familyHistoryDiabetes: boolean;
  physicalActivity: string;
  smoker: boolean;
  alcoholConsumption: number;
  emergencyContactName: string;
  emergencyContactPhone: string;
  observations: string;
}
