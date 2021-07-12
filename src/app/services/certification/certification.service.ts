import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {BehaviorSubject, Observable} from "rxjs";
import {Certification} from "../../shared/models/certification.model";
import {environment} from "../../../environments/environment";
import {map} from "rxjs/operators";
import {CertificationRequest} from "../../shared/models/certification_request.model";

@Injectable({
  providedIn: 'root'
})
export class CertificationService {

  public certifications: Observable<Certification[]>;
  public certificationRequests: Observable<CertificationRequest[]>;

  private certificationsSubject: BehaviorSubject<Certification[]>;
  private certificationRequestsSubject: BehaviorSubject<CertificationRequest[]>;

  constructor(private http: HttpClient) {
    this.certificationsSubject = new BehaviorSubject<Certification[]>(null)
    this.certificationRequestsSubject = new BehaviorSubject<CertificationRequest[]>(null)
    this.certifications = this.certificationsSubject.asObservable();
    this.certificationRequests = this.certificationRequestsSubject.asObservable();
  }

  getAll(): Observable<Certification[]>{
    return this.http.get<Certification[]>(`${environment.baseUrl}/certification/`)
      .pipe(map(certifications => {
        this.certificationsSubject.next(certifications);
        return certifications;
      }));
  }

  getAllRequests(): Observable<CertificationRequest[]> {
    return this.http.get<CertificationRequest[]>(`${environment.baseUrl}/certification/requests/all`)
      .pipe(map( certificationRequests => {
        this.certificationRequestsSubject.next(certificationRequests);
        return certificationRequests;
      }))
  }

  approveRequest(id: string): Observable<Certification> {
    return this.http.put<Certification>(`${environment.baseUrl}/certification/request/${id}/approve`, null);
  }

  removeCertification(id: string): Observable<void> {
    return this.http.delete<void>(`${environment.baseUrl}/certification/${id}`);
  }

  rejectRequest(id: string): Observable<void> {
    return this.http.delete<void>(`${environment.baseUrl}/certification/request/${id}`);
  }
}
