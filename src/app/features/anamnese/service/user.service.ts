import { Injectable } from '@angular/core';
import {environment} from "../../../../../env/env";
import {HttpClient} from "@angular/common/http";
import {CreateUserRequest} from "../auth/models/create-user-request";
import {Observable} from "rxjs";
import {CreateUserResponse} from "../auth/models/create-user-response";
import {AuthRequestModel} from "../auth/models/auth-request.model";
import {AuthResponseModel} from "../auth/models/auth-response.model";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private API_URL = environment.API_URL
  constructor(private http: HttpClient) { }


  authUser(requestData: AuthRequestModel): Observable<AuthResponseModel> {
    return this.http.post<AuthResponseModel>(
      `${this.API_URL}/api/Profissional/login`,
      requestData
    )
  }

  createUser(requestData: CreateUserRequest): Observable<CreateUserResponse> {
    return this.http.post<CreateUserResponse>(
      `${this.API_URL}/api/Profissional/create-profissional`,
      requestData
    )
  }
}
