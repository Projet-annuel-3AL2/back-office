import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class GroupService {

  constructor(private http: HttpClient) { }

  removeGroup(id: string): Observable<void> {
    return this.http.delete<void>(`${environment.apiBaseUrl}/group/${id}`);
  }
}
