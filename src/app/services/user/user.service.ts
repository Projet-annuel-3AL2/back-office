import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from "rxjs";
import {User} from "../../shared/models/user.model";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {map} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  public user: Observable<User>;
  public users: Observable<User[]>;

  private userSubject: BehaviorSubject<User>;
  private usersSubject: BehaviorSubject<User[]>

  constructor(private http: HttpClient) {
    this.userSubject = new BehaviorSubject<User>(null);
    this.usersSubject = new BehaviorSubject<User[]>(null);
    this.user = this.userSubject.asObservable();
    this.users = this.usersSubject.asObservable();
  }

  getByUsername(username: string): Observable<User> {
    return this.http.get<User>(`${environment.baseUrl}/user/${username}`)
      .pipe(map(user => {
        this.userSubject.next(user);
        return user;
      }));
  }

  getAllUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${environment.baseUrl}/user/`)
      .pipe(map( users => {
        this.usersSubject.next(users);
        return users;
      }))
  }

  deleteUser(id: string): Observable<void> {
    return this.http.delete<void>(`${environment.baseUrl}/user/${id}`)
  }

  deleteBannerPicture(id: string): Observable<void> {
    return this.http.delete<void>(`${environment.baseUrl}/user/${id}/profile-picture`)
  }

  deleteProfilePicture(id: string): Observable<void> {
    return this.http.delete<void>(`${environment.baseUrl}/user/${id}/banner-picture`)
  }
}
