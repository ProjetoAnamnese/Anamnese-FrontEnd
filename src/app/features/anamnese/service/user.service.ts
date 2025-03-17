import { Injectable } from '@angular/core';
import {environment} from "../../../../../env/env";
import {HttpClient} from "@angular/common/http";
import {CreateUserRequest} from "../auth/models/create-user-request";
import {Observable} from "rxjs";
import {CreateUserResponse} from "../auth/models/create-user-response";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private API_URL = environment.API_URL
  constructor(private http: HttpClient) { }


  createUser(requestData: CreateUserRequest): Observable<CreateUserResponse> {
    return this.http.post<CreateUserResponse>(
      `${this.API_URL}/api/Profissional/create-profissional`,
      requestData
    )
  }
}
