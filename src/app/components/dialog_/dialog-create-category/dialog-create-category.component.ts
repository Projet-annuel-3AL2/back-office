import { Component, OnInit } from '@angular/core';
import {FormGroup} from "@angular/forms";
import {MatDialogRef} from "@angular/material/dialog";
import {CategoryService} from "../../../services/category/category.service";
import {Category} from "../../../shared/models/category.model";
import {environment} from "../../../../environments/environment";

@Component({
  selector: 'app-dialog-create-category',
  templateUrl: './dialog-create-category.component.html',
  styleUrls: ['./dialog-create-category.component.css']
})
export class DialogCreateCategoryComponent implements OnInit {

  newCategory: Category;

  constructor(public dialogRef: MatDialogRef<DialogCreateCategoryComponent>,
              public _categoryService: CategoryService) { }

  ngOnInit(): void {
    this.newCategory = new Category();
  }

  onNoClick(): void {
    this.dialogRef.close();
  }


  onClickSubmit() {
    this._categoryService.createCategory(this.newCategory).subscribe({
      next: async () => {
        this.dialogRef.close()
      },
      error: err => {
        if (!environment.production) {
          console.error('Error: ', err);
        }
      }
    });
  }
}
