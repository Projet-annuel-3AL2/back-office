import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from "rxjs";
import {Organisation} from "../../shared/models/organisation.model";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {map} from "rxjs/operators";
import {User} from "../../shared/models/user.model";

@Injectable({
  providedIn: 'root'
})
export class OrganisationService {
  public organisations: Observable<Organisation[]>;
  public organisation: Observable<Organisation>;
  public members: Observable<User[]>
  private organisationsSubject: BehaviorSubject<Organisation[]>;
  private organisationSubject: BehaviorSubject<Organisation>;
  private membersSubject: BehaviorSubject<User[]>;

  constructor(private http: HttpClient) {
    this.organisationsSubject = new BehaviorSubject<Organisation[]>(null);
    this.organisationSubject = new BehaviorSubject<Organisation>(null);
    this.organisations = this.organisationsSubject.asObservable();
    this.organisation = this.organisationSubject.asObservable();
  }

  getById(id: string): Observable<Organisation>{
    return this.http.get<Organisation>(`${environment.baseUrl}/organisation/${id}`)
      .pipe(map(organisation=>{
        this.organisationSubject.next(organisation);
        return organisation;
      }));
  }

  getAllOrganisation(): Observable<Organisation[]> {
    return this.http.get<Organisation[]>(`${environment.baseUrl}/organisation/`)
      .pipe(map(organisations => {
        this.organisationsSubject.next(organisations);
        return organisations;
      }));
  }

  getMemberOrganisation(organisationId: string): Observable<User[]> {
    return this.http.get<User[]>(`${environment.baseUrl}/organisation/${organisationId}/members`)
      .pipe(map( users=>{
        this.membersSubject.next(users);
        return users;
      }));
  }

  deleteOrganisation(id: string): Observable<void> {
    return this.http.delete<void>(`${environment.baseUrl}/organisation/${id}`);
  }

  deleteBannerPicture(id: string): Observable<void> {
    return this.http.delete<void>(`${environment.baseUrl}/organisation/${id}`);
  }

  deleteProfilePicture(id: string): Observable<void> {
    return this.http.delete<void>(`${environment.baseUrl}/organisation/${id}`);
  }

  deleteOrganisationMembership(userId: string, organisationId: string) {
    return this.http.delete(`${environment.baseUrl}/organisation/${organisationId}/member/${userId}`);
  }

  giveAdminToMember(userId: string, organisationId: string): Observable<void> {
    return this.http.put<void>(`${environment.baseUrl}/organisation/${organisationId}/add-admin/${userId}`, {});
  }

  removeAdminToAdminMember(userId: string, organisationId: string): Observable<void> {
    return this.http.put<void>(`${environment.baseUrl}/organisation/${organisationId}/remove-admin/${userId}`, {});
  }

  isAdmin(id: string): Observable<boolean> {
    return this.http.get<boolean>(`${environment.baseUrl}/organisation/${id}/is-admin`)
  }

  isOwner(id: string): Observable<boolean> {
    return this.http.get<boolean>(`${environment.baseUrl}/organisation/${id}/is-owner`)
  }
}
