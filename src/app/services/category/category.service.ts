import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from "rxjs";
import {Category} from "../../shared/models/category.model";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {map} from "rxjs/operators";
import {DialogShowPictureComponent} from "../../components/dialog_/dialog-show-picture/dialog-show-picture.component";
import {DialogCreateCategoryComponent} from "../../components/dialog_/dialog-create-category/dialog-create-category.component";

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
    return this.http.get<Category[]>(`${environment.apiBaseUrl}/category/`)
      .pipe(map(categories => {
        this.categoriesSubject.next(categories);
        return categories;
      }));
  }

  removeCategory(id: string): Observable<void> {
    return this.http.delete<void>(`${environment.apiBaseUrl}/category/${id}`);
  }

  createCategory(category: Category): Observable<Category> {
    return this.http.post<Category>(`${environment.apiBaseUrl}/category/`, category);
  }

  updateCategory(category: Category): Observable<Category>{
    return this.http.put<Category>(`${environment.apiBaseUrl}/category/${category.id}`, category);
  }

}
