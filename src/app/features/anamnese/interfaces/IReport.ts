export interface IReport
{
  reportId: number,
  reportDateTime: Date,
  medicalHistory: string
  currentMedications: string,
  cardiovascularIssues: boolean,
  diabetes: boolean,
  familyHistoryCardiovascularIssues: boolean,
  familyHistoryDiabetes: boolean,
  physicalActivity: string,
  smoker: boolean,
  alcoholConsumption: number,
  emergencyContactName: string,
  emergencyContactPhone: string,
  observations: string,
  pacientId: number,
  pacientName: string,
}
