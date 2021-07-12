import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {CategoryService} from "../../../services/category/category.service";
import {Category} from "../../../shared/models/category.model";
import {environment} from "../../../../environments/environment";

@Component({
  selector: 'app-dialog-update-category',
  templateUrl: './dialog-update-category.component.html',
  styleUrls: ['./dialog-update-category.component.css']
})
export class DialogUpdateCategoryComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<DialogUpdateCategoryComponent>,
              public _categoryService: CategoryService,
              @Inject(MAT_DIALOG_DATA) public data: { category: Category}) { }

  ngOnInit(): void {

  }

  onNoClick(): void {
    this.dialogRef.close();
  }


  onClickSubmit() {
    this._categoryService.updateCategory(this.data.category).subscribe({
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
