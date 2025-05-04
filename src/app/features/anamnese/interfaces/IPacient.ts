export interface IPacient {
  id: number;
  username: string;
  email: string;
  address: string;
  uf: string;
  phone: string;
  birth: string;
  gender: string;
  profession: string;
  profissionalId: number;
  medicalSpeciality: string;
  appointment ?:{
    appointmentId: number;
    appointmentDateTime: string,
    pacientId: string;
    profissionalId: string;
  }
  report?: {
    reportId: number;
    reportDateTime: string;
    medicalHistory: string;
    currentMedications: string;
    cardiovascularIssues: boolean;
    diabetes: boolean;
    familyHistoryCardiovascularIssues: boolean;
    familyHistoryDiabetes: boolean;
    physicalActivity: string;
    smoker: boolean;
    alcoholConsumption: number;
    emergencyContactName: string;
    emergencyContactPhone: string;
    observations: string;
    pacientId: number;
    pacientName: string;
  };
}
