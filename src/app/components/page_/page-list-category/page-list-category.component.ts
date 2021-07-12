import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {Category} from "../../../shared/models/category.model";
import {MatDialog} from "@angular/material/dialog";
import {CategoryService} from "../../../services/category/category.service";
import {environment} from "../../../../environments/environment";
import {DialogCreateCategoryComponent} from "../../dialog_/dialog-create-category/dialog-create-category.component";
import {DialogUpdateCategoryComponent} from "../../dialog_/dialog-update-category/dialog-update-category.component";

@Component({
  selector: 'app-page-list-category',
  templateUrl: './page-list-category.component.html',
  styleUrls: ['./page-list-category.component.css']
})
export class PageListCategoryComponent implements OnInit, AfterViewInit {

  displayedColumns: string[] = ['name', 'id'];
  dataSource: MatTableDataSource<Category>
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(public dialog: MatDialog,
              public _categoryService: CategoryService) { }

  async ngOnInit(): Promise<void> {
    await this.updateData();
  }

  private async updateData() {
    this._categoryService.getAllCategory().subscribe({
      error: err => {
        if (!environment.production) {
          console.error('Error: ', err);
        }
      }
    });
    await this._categoryService.categories.subscribe( categories => {
      this.dataSource = new MatTableDataSource<Category>(categories);
    })
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.sort !== null?this.dataSource.sort = this.sort: null;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  removeCategory(id) {
    this._categoryService.removeCategory(id).subscribe({
      next: async () => {
        await this.updateData();
      },
      error: err => {
        if (!environment.production) {
          console.error('Error: ', err);
        }
      }
    });
  }

  showDialogCreateCategory() {
    const dialogRef = this.dialog.open(DialogCreateCategoryComponent, {
      width: '500px',
      data: {}
    });

    dialogRef.afterClosed().subscribe(async () => {
      await this.updateData();
    });
  }

  showDialogUpdateCategory(category: Category) {
    const dialogRef = this.dialog.open(DialogUpdateCategoryComponent, {
      width: '500px',
      data: {category: category}
    });

    dialogRef.afterClosed().subscribe(async () => {
      await this.updateData();
    });
  }

}
