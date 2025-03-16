import { Injectable } from '@angular/core';
import {environment} from "../../../../../../env/env";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {CookieService} from "ngx-cookie-service";
import {AuthResponseModel} from "../models/auth-response.model";
import {SignUpUserRequest} from "../models/signup-user-request";
import {SignupUserResponse} from "../models/signup-user-response";
import {AuthRequestModel} from "../models/auth-request.model";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private API_URL = environment.API_URL
  private token = this.cookieService.get("USER_INFO")
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${this.token}`
    })
  }

  constructor(private http: HttpClient, private cookieService: CookieService) { }

  isLoggedIn(): boolean {
    // Se o usuario possui um token ou cookie
    const token = this.cookieService.get('USER_INFO');
    return token ? true : false;
  }

  getProfissionalInfo() {
    return this.http.get(
      `${this.API_URL}/api/Profissional/get-profissional-by-token`,
      this.httpOptions
    )
  }
  signupUser(requestData: SignUpUserRequest): Observable<SignupUserResponse> {
    return this.http.post<SignupUserResponse>(
      `${this.API_URL}/api/Profissional/create-profissional`,
      requestData
    )
  }

  authUser(requestData: AuthRequestModel): Observable<AuthResponseModel> {
    return this.http.post<AuthResponseModel>(
      `${this.API_URL}/api/Profissional/login`,
      requestData
    )
  }

}
