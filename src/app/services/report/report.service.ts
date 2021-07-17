import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from "rxjs";
import {Report} from "../../shared/models/report.model";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {map} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class ReportService {

  public reports: Observable<Report[]>;

  private reportsSubject: BehaviorSubject<Report[]>

  constructor(private http: HttpClient) {
    this.reportsSubject = new BehaviorSubject<Report[]>(null);
    this.reports = this.reportsSubject.asObservable();
  }

  getEventReports(): Observable<Promise<Report[]>>{
    return this.http.get<Report[]>(`${environment.apiBaseUrl}/event/reports/all-event`)
      .pipe(map(  async reports => {
        for (const report of reports) {
          await this.getCountEvent(report.reportedEvent.id).subscribe(nbReport => {
              report.nbReport = nbReport;
            }
          );
        }
        this.reportsSubject.next(reports)
        return reports;
      }))
  }

  private getCountEvent(id: string): Observable<number> {
    return this.http.get<number>(`${environment.apiBaseUrl}/event/${id}/count-report`)
  }

  getPostReports(): Observable<Promise<Report[]>>{
    return this.http.get<Report[]>(`${environment.apiBaseUrl}/post/reports/all-post`)
      .pipe(map(  async reports => {
        for (const report of reports) {
          await this.getCountPost(report.reportedPost.id).subscribe(nbReport => {
              report.nbReport = nbReport;
            }
          );
        }
        this.reportsSubject.next(reports)
        return reports;
      }))
  }

  private getCountPost(id: string): Observable<number> {
    return this.http.get<number>(`${environment.apiBaseUrl}/post/${id}/count-report`)
  }

  getGroupReports(): Observable<Promise<Report[]>>{
    return this.http.get<Report[]>(`${environment.apiBaseUrl}/group/reports/all-group`)
      .pipe(map(  async reports => {
        for (const report of reports) {
          await this.getCountGroup(report.reportedGroup.id).subscribe(nbReport => {
              report.nbReport = nbReport;
            }
          );
        }
        this.reportsSubject.next(reports)
        return reports;
      }))
  }

  private getCountGroup(id: string): Observable<number> {
    return this.http.get<number>(`${environment.apiBaseUrl}/group/${id}/count-report`)
  }

  getOrganisationReports(): Observable<Promise<Report[]>>{
    return this.http.get<Report[]>(`${environment.apiBaseUrl}/organisation/reports/all-event`)
      .pipe(map(  async reports => {
        for (const report of reports) {
          await this.getCountOrganisation(report.reportedOrganisation.id).subscribe(nbReport => {
              report.nbReport = nbReport;
            }
          );
        }
        this.reportsSubject.next(reports)
        return reports;
      }))
  }

  private getCountOrganisation(id: string): Observable<number> {
    return this.http.get<number>(`${environment.apiBaseUrl}/organisation/${id}/count-report`)
  }

  getUserReports(): Observable<Promise<Report[]>>{
    return this.http.get<Report[]>(`${environment.apiBaseUrl}/user/reports/all-event`)
      .pipe(map(  async reports => {
        for (const report of reports) {
          await this.getCountUser(report.reportedUser.id).subscribe(nbReport => {
              report.nbReport = nbReport;
            }
          );
        }
        this.reportsSubject.next(reports)
        return reports;
      }))
  }

  private getCountUser(id: string): Observable<number> {
    return this.http.get<number>(`${environment.apiBaseUrl}/${id}/count-report`);
  }

  removeReport(reportId: string): Observable<void> {
    return this.http.delete<void>(`${environment.apiBaseUrl}/user/report/${reportId}`);
  }
}
