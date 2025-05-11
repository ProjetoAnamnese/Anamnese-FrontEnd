import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {CookieService} from "ngx-cookie-service";
import {Observable, tap} from "rxjs";
import {FormGroup} from "@angular/forms";
import {environment} from "../../../../../env/env";
import {ReportRequest} from "../../../shared/dtos/report/CreateReportRequest";
import {IReport} from "../interfaces/IReport";

@Injectable({
  providedIn: 'root'
})
export class ReportsService {
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



  createReport(pacientId: number, requestData: ReportRequest): Observable<Array<IReport>> {
    return this.http.post<Array<IReport>>(
      `${this.API_URL}/api/Report/create-report/${pacientId}`, requestData, this.httpOptions
    );
  }


  getAllReports(filters?: any): Observable<Array<IReport>> {
    const params = new HttpParams({ fromObject: filters });
    return this.http.get<Array<IReport>>(`${this.API_URL}/api/Report/get-reports`,
      { headers: this.httpOptions.headers, params }
    )
  }

  getReportByPacientId(pacientId: number, reportForm: FormGroup): Observable<IReport> {
    return this.http.get<IReport>(`${this.API_URL}/api/Report/get-pacient-report/${pacientId}`, this.httpOptions).pipe(
      tap((reportData: IReport) =>{
          reportForm.patchValue({
            medicalHistory: reportData.medicalHistory || '',
            currentMedications: reportData.currentMedications || '',
            cardiovascularIssues: reportData.cardiovascularIssues || false,
            diabetes: reportData.diabetes || false,
            familyHistoryCardiovascularIssues: reportData.familyHistoryCardiovascularIssues || false,
            familyHistoryDiabetes: reportData.familyHistoryDiabetes || false,
            physicalActivity: reportData.physicalActivity || '',
            smoker: reportData.smoker || false,
            alcoholConsumption: reportData.alcoholConsumption || 0,
            emergencyContactName: reportData.emergencyContactName || '',
            emergencyContactPhone: reportData.emergencyContactPhone || '',
            observations: reportData.observations || ''
          })
      })
    )
  }

  getReportById(reportId: number, reportForm: FormGroup): Observable<IReport> {
    return this.http.get<IReport>(
      `${this.API_URL}/api/Report/get-report/${reportId}`,
      this.httpOptions
    )
  }
  getReportId(pacientId: number): Observable<number> {
    return this.http.get<number>(`${this.API_URL}/api/Report/get-pacient-report/${pacientId}`, this.httpOptions)
  }


  deleteReport( reportId: number ): Observable<void>{
    return this.http.delete<void>(`${this.API_URL}/api/Report/delete-report/${reportId}`,
      this.httpOptions)

  }



editReport(reportId: number, requestData: ReportRequest): Observable<void>{
    return this.http.put<void>(`${this.API_URL}/api/Report/update-report/${reportId}`, requestData, this.httpOptions)
}



  countReport () : Observable<number>
  {
    return this.http.get<number>(`${this.API_URL}/api/Report/count-report`,
      this.httpOptions)
  }




}
