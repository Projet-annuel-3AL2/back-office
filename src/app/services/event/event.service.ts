import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from "rxjs";
import {Event} from "../../shared/models/event.model";
import {User} from "../../shared/models/user.model";
import {HttpClient} from "@angular/common/http";
import {Organisation} from "../../shared/models/organisation.model";
import {environment} from "../../../environments/environment";
import {map} from "rxjs/operators";
@Injectable({
  providedIn: 'root'
})
export class EventService {
  public events: Observable<Event[]>;
  public event: Observable<Event>;
  public participations: Observable<User[]>;

  private eventsSubject: BehaviorSubject<Event[]>;
  private eventSubject: BehaviorSubject<Event>
  private participationsSubject: BehaviorSubject<User[]>;

  constructor(private http: HttpClient) {
    this.eventsSubject = new BehaviorSubject<Event[]>(null);
    this.eventSubject = new BehaviorSubject<Event>(null);
    this.participationsSubject = new BehaviorSubject<User[]>(null);

    this.events = this.eventsSubject.asObservable();
    this.event = this.eventSubject.asObservable();
    this.participations = this.participationsSubject.asObservable();
  }

  getById(id: string): Observable<Event>{
    return this.http.get<Event>(`${environment.apiBaseUrl}/event/${id}`)
      .pipe(map(event=>{
        this.eventSubject.next(event);
        return event;
      }));
  }

  getAllEvent(): Observable<Event[]> {
    return this.http.get<Event[]>(`${environment.apiBaseUrl}/event/`)
      .pipe(map(events => {
        this.eventsSubject.next(events);
        return events;
      }));
  }

  getEventMembers(eventId: string): Observable<User[]> {
    return this.http.get<User[]>(`${environment.apiBaseUrl}/event/${eventId}/participants-all`)
      .pipe(map(users => {
        this.participationsSubject.next(users);
        return users;
      }));
  }

  deleteParticipantEvent(userId: string, eventId: string): Observable<Object> {
    return this.http.delete(`${environment.apiBaseUrl}/event/${eventId}/participant/${userId}`);
  }

  deleteEvent(eventId: string): Observable<void> {
    return this.http.delete<void>(`${environment.apiBaseUrl}/event/${eventId}`);
  }

  // TODO : Pas Implementer coter API
  deleteProfilePicture(id: string) {
    return this.http.delete<void>(`${environment.apiBaseUrl}/event/${id}/profile-picture`);
  }

  // TODO : Pas Implementer coter API
  deleteBannerPicture(id: string) {
    return this.http.delete<void>(`${environment.apiBaseUrl}/event/${id}/banner-picture`);
  }
}
