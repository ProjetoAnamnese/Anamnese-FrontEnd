import { Injectable } from '@angular/core';
import {environment} from "../../../../../env/env";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {CookieService} from "ngx-cookie-service";
import {Observable} from "rxjs";
import {ProfissionalAvailableResponse} from "../../../shared/dtos/profissional-available/profissionalAvailableResponse";

@Injectable({
  providedIn: 'root'
})
export class ProfissionalAvailableService {
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

  getProfissionalAvailable(profissionalId: number): Observable<ProfissionalAvailableResponse[]> {
    return this.http.get<ProfissionalAvailableResponse[]>(
      `${this.API_URL}/api/ProfissionalAvailable/profissional-available/${profissionalId}`
    );
  }
  getProfissionalsBySpeciality(speciality: string): Observable<Array<any>> {
    return this.http.get<Array<any>>(
      `${this.API_URL}/api/ProfissionalAvailable/profissional-by-speciality?speciality=${speciality}`
    );
  }

  editProfissionalAvailability(availabilityId: number, requestData:{startTime: string, endTime: string}){
    return this.http.put<any>(
      `${this.API_URL}/api/ProfissionalAvailable/edit-available/${availabilityId}`,
      requestData,
      this.httpOptions
    );
  }
  sendProfissionalAvailable(dayOfWeek: string, startTime: string, endTime: string):Observable<ProfissionalAvailableResponse> {
    const requestData = {dayOfWeek, startTime, endTime}
    return this.http.post<ProfissionalAvailableResponse>(
      `${this.API_URL}/api/ProfissionalAvailable/create-profissional-available`,
      requestData,
      this.httpOptions
    );
  }
}
