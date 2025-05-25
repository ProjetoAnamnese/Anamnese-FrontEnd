import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {environment} from "../../../../../env/env";
import {CookieService} from "ngx-cookie-service";
import {AppointmentRequest} from "../../../shared/dtos/schedules/AppointmentRequest";
import {Observable} from "rxjs";
import {AppointmentResponse} from "../../../shared/dtos/schedules/AppointmentResponse";

@Injectable({
  providedIn: 'root'
})
export class ScheduleService {
  private readonly API_URL = environment.API_URL;
  private token = this.cookie.get("USER_INFO")


  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${this.token}`
    })
  }

  constructor(private http: HttpClient, private cookie: CookieService) {
  }


  getProfissionalAppointment(profissionalId: number): Observable<AppointmentResponse[]> {
    return this.http.get<AppointmentResponse[]>(
      `${this.API_URL}/api/Appointment/profissional-appointments/${profissionalId}`,
      this.httpOptions
    );
  }

  scheduleAppointment(profissionalId: number, pacientId: number,appointmentDate: string, appointmentTime: string ): Observable<AppointmentRequest> {
    const requestData: AppointmentRequest = {
      profissionalId: profissionalId,
      pacientId: pacientId,
      appointmentDate: appointmentDate,
      appointmentTime: appointmentTime
    };
    return this.http.post<AppointmentRequest>(
      `${this.API_URL}/api/Appointment/schedule-appointment`,
      requestData,
      this.httpOptions
    )
  }
}
