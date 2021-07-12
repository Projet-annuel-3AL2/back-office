import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from "rxjs";
import {Category} from "../../shared/models/category.model";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {map} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  public categories: Observable<Category[]>;

  private categoriesSubject: BehaviorSubject<Category[]>;

  constructor(private http: HttpClient) {
    this.categoriesSubject = new BehaviorSubject<Category[]>(null);
    this.categories = this.categoriesSubject.asObservable();
  }

  getAllCategory(): Observable<Category[]> {
    return this.http.get<Category[]>(`${environment.baseUrl}/category/`)
      .pipe(map(categories => {
        this.categoriesSubject.next(categories);
        return categories;
      }));
  }

  removeCategory(id: string): Observable<void> {
    return this.http.delete<void>(`${environment.baseUrl}/category/${id}`);
  }

  createCategory(category: Category): Observable<Category> {
    return this.http.post<Category>(`${environment.baseUrl}/category/`, category);
  }

  updateCategory(id: string, category: Category): Observable<Category>{
    return this.http.put<Category>(`${environment.baseUrl}/category/${id}`, category);
  }

}
