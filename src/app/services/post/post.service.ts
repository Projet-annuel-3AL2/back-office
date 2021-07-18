import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor(private http: HttpClient) { }

  removePost(id: string): Observable<void> {
    return this.http.delete<void>(`${environment.apiBaseUrl}/post/${id}`);
  }
}
