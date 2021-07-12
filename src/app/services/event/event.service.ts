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
    return this.http.get<Event>(`${environment.baseUrl}/event/${id}`)
      .pipe(map(event=>{
        this.eventSubject.next(event);
        return event;
      }));
  }

  getAllEvent(): Observable<Event[]> {
    return this.http.get<Event[]>(`${environment.baseUrl}/event/`)
      .pipe(map(events => {
        this.eventsSubject.next(events);
        return events;
      }));
  }

  getEventMembers(eventId: string): Observable<User[]> {
    return this.http.get<User[]>(`${environment.baseUrl}/event/${eventId}/participants`)
      .pipe(map(users => {
        this.participationsSubject.next(users);
        return users;
      }));
  }

  deleteParticipantEvent(eventId: string, userId: string): Observable<Object> {
    return this.http.delete(`${environment.baseUrl}/event/${eventId}/participant/${userId}`);
  }

  deleteEvent(eventId: string): Observable<void> {
    return this.http.delete<void>(`${environment.baseUrl}/event/${eventId}`);
  }

  // TODO : Pas Implementer coter API
  deleteProfilePicture(id: string) {
    return this.http.delete<void>(`${environment.baseUrl}/event/${id}/profile-picture`);
  }

  // TODO : Pas Implementer coter API
  deleteBannerPicture(id: string) {
    return this.http.delete<void>(`${environment.baseUrl}/event/${id}/banner-picture`);
  }
}
