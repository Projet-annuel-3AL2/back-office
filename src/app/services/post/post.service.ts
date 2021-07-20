import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {BehaviorSubject, Observable} from "rxjs";
import {environment} from "../../../environments/environment";
import {Post} from "../../shared/models/post.model";
import {ReportService} from "../report/report.service";
import {map} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class PostService {

  public posts: Observable<Post[]>;

  private postsSubject: BehaviorSubject<Post[]>;

  constructor(private http: HttpClient,
              private _reportService: ReportService) {
    this.postsSubject = new BehaviorSubject<Post[]>(null);
    this.posts = this.postsSubject.asObservable();
  }

  removePost(id: string): Observable<void> {
    return this.http.delete<void>(`${environment.apiBaseUrl}/post/${id}`);
  }

  getAllPostFromUser(username: string): Observable<Promise<Post[]>> {
    return this.http.get<Post[]>(`${environment.apiBaseUrl}/user/${username}/posts`)
      .pipe(map( async posts => {
        for (const post of posts) {
          await this._reportService.getCountPost(post.id).subscribe(nbReport => {
            post.nbReport = nbReport
          });
        }
        this.postsSubject.next(posts);
        return posts;
      }))
  }
}
