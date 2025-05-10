import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import { CookieService } from "ngx-cookie-service";
import { Observable } from "rxjs";
import {environment} from "../../../../../env/env";
import {GetPacientsResponse} from "../../../shared/dtos/pacient/GetPacientsResponse";
import {AddPacientRequest} from "../../../shared/dtos/pacient/AddPacientRequest";
import {EditPacientRequest} from "../../../shared/dtos/pacient/EditPacientRequest";
import {IPacient} from "../interfaces/IPacient";
import {PagedResponse} from "../../../shared/interface/PagedResponse";

@Injectable({ providedIn: 'root' })
export class PacientService {
  private readonly API_URL = environment.API_URL;
  private readonly USER_AUTH = environment.COOKIES_VALUE.user_auth;

  constructor(private http: HttpClient, private cookie: CookieService) {
  }

  private get httpOptions() {
    const token = this.cookie.get(this.USER_AUTH);
    return {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      })
    };
  }

  getAllPacients(filters?: any): Observable<PagedResponse<IPacient>> {
    const params = new HttpParams({ fromObject: filters });
    return this.http.get<PagedResponse<IPacient>>(
      `${this.API_URL}/api/Pacient/get-pacients`,
      { headers: this.httpOptions.headers, params }
    );
  }


  getProfissionalPacients(): Observable<GetPacientsResponse[]> {
    return this.http.get<GetPacientsResponse[]>(
      `${this.API_URL}/api/Pacient/get-profissional-pacient`,
      this.httpOptions
    );
  }

  getPacientById(pacientId: number): Observable<GetPacientsResponse> {
    return this.http.get<GetPacientsResponse>(
      `${this.API_URL}/api/Pacient/get-pacient/${pacientId}`
    );
  }

  // sendMedicalSpeciality(pacientId: number, medicalSpeciality: string): Observable<SendMedicalSpecialityRequest> {
  //   return this.http.post<SendMedicalSpecialityRequest>(
  //     `${this.API_URL}/api/Pacient/pacient-medical-speciality/${pacientId}`,
  //     { medicalSpeciality },
  //     this.httpOptions
  //   );
  // }

  createPacient(requestData: AddPacientRequest): Observable<GetPacientsResponse[]> {
    return this.http.post<GetPacientsResponse[]>(
      `${this.API_URL}/api/Pacient/create-pacient`,
      requestData,
      this.httpOptions
    );
  }

  editPacient(requestData: EditPacientRequest, pacientId: number): Observable<void> {
    return this.http.put<void>(
      `${this.API_URL}/api/Pacient/update-pacient/${pacientId}`,
      requestData,
      this.httpOptions
    );
  }

  deletePacient(requestData: { pacient_id: number }): Observable<void> {
    return this.http.delete<void>(
      `${this.API_URL}/api/Pacient/remove-pacient/${requestData.pacient_id}`,
      this.httpOptions
    );
  }

  countAllPacients(): Observable<number> {
    return this.http.get<number>(
      `${this.API_URL}/api/Pacient/count-pacients`,
      this.httpOptions
    );
  }

  countProfissionalPacients(): Observable<number> {
    return this.http.get<number>(
      `${this.API_URL}/api/Pacient/count-profissional`,
      this.httpOptions
    );
  }

  countSpeciality(): Observable<any> {
    return this.http.get(
      `${this.API_URL}/api/Pacient/count-pacient-by-specialty`
    );
  }
}
