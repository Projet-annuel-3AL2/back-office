import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from "rxjs";
import {Organisation} from "../../shared/models/organisation.model";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {map} from "rxjs/operators";
import {User} from "../../shared/models/user.model";
import {OrganisationMembership} from "../../shared/models/organisation_membership.model";

@Injectable({
  providedIn: 'root'
})
export class OrganisationService {
  public organisations: Observable<Organisation[]>;
  public organisation: Observable<Organisation>;
  public members: Observable<OrganisationMembership[]>
  private organisationsSubject: BehaviorSubject<Organisation[]>;
  private organisationSubject: BehaviorSubject<Organisation>;
  private membersSubject: BehaviorSubject<OrganisationMembership[]>;

  constructor(private http: HttpClient) {
    this.organisationsSubject = new BehaviorSubject<Organisation[]>(null);
    this.organisationSubject = new BehaviorSubject<Organisation>(null);
    this.membersSubject = new BehaviorSubject<OrganisationMembership[]>(null);
    this.organisations = this.organisationsSubject.asObservable();
    this.organisation = this.organisationSubject.asObservable();
    this.members = this.membersSubject.asObservable();
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

  getOrganisationMembership(organisationId: string): Observable<OrganisationMembership[]> {
    return this.http.get<OrganisationMembership[]>(`${environment.baseUrl}/organisation/${organisationId}/membership`)
      .pipe(map( members=>{
        this.membersSubject.next(members);
        return members;
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
