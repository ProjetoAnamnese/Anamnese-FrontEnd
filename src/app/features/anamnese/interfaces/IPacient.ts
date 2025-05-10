import {IReport} from "./IReport";

export interface IPacient {
  pacientId: number;
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
  report?: IReport
}
