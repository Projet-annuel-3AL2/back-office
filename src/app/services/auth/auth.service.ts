import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable, timer} from "rxjs";
import {User, UserType} from "../../shared/models/user.model";
import {HttpClient} from "@angular/common/http";
import {UserService} from "../user/user.service";
import {environment} from "../../../environments/environment";
import {map} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public user: Observable<User>;
  private userSubject: BehaviorSubject<User>;

  constructor(private http: HttpClient, private _userService: UserService) {
    this.userSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('user')));
    this.user = this.userSubject.asObservable();
    timer(0,30000).subscribe(()=> this.updateUser());
  }

  updateUser(){
    if(this.isAuthenticated()) {
      this._userService.getByUsername(this.getCurrentUsername()).subscribe(user=>this.userSubject.next(user));
    }
  }

  public login(username: string, password: string): Observable<User> {
    return this.http.post<User>(`${environment.apiBaseUrl}/auth/login`, {
      username,
      password
    })
      .pipe(map(user => {
        if(user.userType === UserType.USER){
          this.logout().subscribe()
          throw new Error("Accès réserver aux administrateurs");
        }
        localStorage.setItem('user', JSON.stringify(user.username));
        this._userService.getByUsername(user.username).subscribe(this.userSubject.next);
        return user;
      }));
  }

  public logout(): Observable<unknown> {
    this.userSubject.next(null);
    localStorage.removeItem('user');
    return this.http.delete(`${environment.apiBaseUrl}/auth/logout`);
  }

  public isAuthenticated(): boolean {
    const username = this.getCurrentUsername();
    return username !== null && username !== undefined && username !== "";
  }

  public getCurrentUsername(): string {
    return JSON.parse(localStorage.getItem('user'));
  }
}
