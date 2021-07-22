import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from "rxjs";
import {Organisation} from "../../shared/models/organisation.model";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {map} from "rxjs/operators";
import {OrganisationMembership} from "../../shared/models/organisation_membership.model";
import {OrganisationRequest} from "../../shared/models/organisation_request.model";

@Injectable({
  providedIn: 'root'
})
export class OrganisationService {
  public organisations: Observable<Organisation[]>;
  public organisation: Observable<Organisation>;
  public members: Observable<OrganisationMembership[]>;
  public organisationRequests: Observable<OrganisationRequest[]>;

  private organisationsSubject: BehaviorSubject<Organisation[]>;
  private organisationSubject: BehaviorSubject<Organisation>;
  private membersSubject: BehaviorSubject<OrganisationMembership[]>;
  private organisationRequestsSubject: BehaviorSubject<OrganisationRequest[]>;


  constructor(private http: HttpClient) {
    this.organisationsSubject = new BehaviorSubject<Organisation[]>(null);
    this.organisationSubject = new BehaviorSubject<Organisation>(null);
    this.membersSubject = new BehaviorSubject<OrganisationMembership[]>(null);
    this.organisationRequestsSubject = new BehaviorSubject<OrganisationRequest[]>(null);
    this.organisations = this.organisationsSubject.asObservable();
    this.organisation = this.organisationSubject.asObservable();
    this.members = this.membersSubject.asObservable();
    this.organisationRequests = this.organisationRequestsSubject.asObservable();
  }

  getById(id: string): Observable<Organisation>{
    return this.http.get<Organisation>(`${environment.apiBaseUrl}/organisation/${id}`)
      .pipe(map(organisation=>{
        this.organisationSubject.next(organisation);
        return organisation;
      }));
  }

  getAllOrganisation(): Observable<Organisation[]> {
    return this.http.get<Organisation[]>(`${environment.apiBaseUrl}/organisation/`)
      .pipe(map(organisations => {
        this.organisationsSubject.next(organisations);
        return organisations;
      }));
  }

  getOrganisationMembership(organisationId: string): Observable<OrganisationMembership[]> {
    return this.http.get<OrganisationMembership[]>(`${environment.apiBaseUrl}/organisation/${organisationId}/membership`)
      .pipe(map( members=>{
        this.membersSubject.next(members);
        return members;
      }));
  }

  getRequests(): Observable<OrganisationRequest[]> {
    return this.http.get<OrganisationRequest[]>(`${environment.apiBaseUrl}/organisation/create-requests`)
      .pipe(map(organisationRequests => {
          this.organisationRequestsSubject.next(organisationRequests);
          return organisationRequests;
      }));
  }

  acceptRequest(id: string): Observable<void> {
    return this.http.put<void>(`${environment.apiBaseUrl}/organisation/${id}/accept`, null);
  }

  rejectRequest(id: string): Observable<void> {
    return this.http.delete<void>(`${environment.apiBaseUrl}/organisation/${id}/reject`);
  }

  deleteOrganisation(id: string): Observable<void> {
    return this.http.delete<void>(`${environment.apiBaseUrl}/organisation/${id}`);
  }

  // TODO : Pas Implementer coter API
  deleteBannerPicture(id: string): Observable<void> {
    return this.http.delete<void>(`${environment.apiBaseUrl}/organisation/${id}/banner-picture`);
  }

  // TODO : Pas Implementer coter API
  deleteProfilePicture(id: string): Observable<void> {
    return this.http.delete<void>(`${environment.apiBaseUrl}/organisation/${id}/profile-picture`);
  }

  deleteOrganisationMembership(userId: string, organisationId: string) {
    return this.http.delete(`${environment.apiBaseUrl}/organisation/${organisationId}/member/${userId}`);
  }

  giveAdminToMember(userId: string, organisationId: string): Observable<void> {
    return this.http.put<void>(`${environment.apiBaseUrl}/organisation/${organisationId}/add-admin/${userId}`, {});
  }

  removeAdminToAdminMember(userId: string, organisationId: string): Observable<void> {
    return this.http.put<void>(`${environment.apiBaseUrl}/organisation/${organisationId}/remove-admin/${userId}`, {});
  }

  isAdmin(id: string): Observable<boolean> {
    return this.http.get<boolean>(`${environment.apiBaseUrl}/organisation/${id}/is-admin`)
  }

  isOwner(id: string): Observable<boolean> {
    return this.http.get<boolean>(`${environment.apiBaseUrl}/organisation/${id}/is-owner`)
  }
}
