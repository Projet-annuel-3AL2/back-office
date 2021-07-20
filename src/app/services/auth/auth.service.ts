import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable, timer} from "rxjs";
import {User, UserType} from "../../shared/models/user.model";
import {HttpClient} from "@angular/common/http";
import {UserService} from "../user/user.service";
import {environment} from "../../../environments/environment";
import {map} from "rxjs/operators";
import {CookieService} from "ngx-cookie-service";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public user: Observable<User>;
  private userSubject: BehaviorSubject<User>;

  constructor(private http: HttpClient, private _userService: UserService, private cookieService: CookieService) {
    this.userSubject = new BehaviorSubject<User>(null);
    this.user = this.userSubject.asObservable();
    timer(0,30000).subscribe(()=> this.updateUser());
  }

  public getCurrentUser(): Observable<User> {
    return this.http.get<User>(`${environment.apiBaseUrl}/user/${this.getCurrentUsername()}`)
      .pipe(map(user => {
        this.userSubject.next(user);
        return user;
      }));
  }

  async updateUser() {
    if (this.getCurrentUsername()) {
      await this.getCurrentUser().toPromise();
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
        this.cookieService.set('user', user.username,3,"", environment.domain,false,'Strict');
        this._userService.getByUsername(user.username).subscribe(this.userSubject.next);
        return user;
      }));
  }

  public logout(): Observable<unknown> {
    this.userSubject.next(null);
    this.cookieService.delete('user');
    return this.http.delete(`${environment.apiBaseUrl}/auth/logout`);
  }

  public isAuthenticated(): boolean {
    const username = this.getCurrentUsername();
    return username !== null && username !== undefined && username !== "";
  }

  public getCurrentUsername(): string {
    return this.cookieService.get('user');
  }
}
