import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
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


  getProfissionalAppointment(filters?:any): Observable<AppointmentResponse[]> {
    console.log('FILTERS AQUI', filters)
    const params = new HttpParams({ fromObject: filters });
    return this.http.get<AppointmentResponse[]>(
      `${this.API_URL}/api/Appointment/profissional-appointments`,
      { headers: this.httpOptions.headers, params }
    );
  }


  updatedSchedule(appointmentId: number, updatedAppointment : {isCanceled: boolean}): Observable<any> {
    return this.http.patch(
      `${this.API_URL}/api/Appointment/update-appointment/${appointmentId}`,
      updatedAppointment,
      this.httpOptions
    )
  }
  scheduleAppointment(pacientId: number,appointmentDate: string, appointmentTime: string ): Observable<AppointmentRequest> {
    const requestData: AppointmentRequest = {
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
  countNextOfTheDay(): Observable<any> {
    return this.http.get<any>(
      `${this.API_URL}/api/Appointment/next-of-day`,
      this.httpOptions
    );
  }
}
