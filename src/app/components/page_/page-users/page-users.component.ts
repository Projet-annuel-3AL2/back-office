import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {UserService} from "../../../services/user/user.service";
import {environment} from "../../../../environments/environment";
import {MatTableDataSource} from "@angular/material/table";
import {User} from "../../../shared/models/user.model";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {MatDialog} from "@angular/material/dialog";
import {DialogShowPictureComponent} from "../../dialog_/dialog-show-picture/dialog-show-picture.component";

@Component({
  selector: 'app-page-users',
  templateUrl: './page-users.component.html',
  styleUrls: ['./page-users.component.css']
})
export class PageUsersComponent implements OnInit, AfterViewInit {

  displayedColumns: string[] = ['username', 'mail', 'certification', 'profilePicture', 'bannerPicture', 'id'];
  dataSource: MatTableDataSource<User>
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(public _userService: UserService,
              public dialog: MatDialog) {

  }

  async ngOnInit(): Promise<void> {
    this._userService.getAllUsers().subscribe({
        error: err => {
          if (!environment.production) {
            console.error('Error: ', err);
          }
        }
      }
    );
    await this._userService.users.subscribe(users => {
      this.dataSource = new MatTableDataSource(users)
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

  deleteUser(id) {
    this._userService.deleteUser(id).subscribe({
      next: () => {
        this.ngOnInit();
      },
      error: err => {
        if (!environment.production) {
          console.error('Error: ', err);
        }
      }
    });
  }

  deleteProfilePicture(id) {
    this._userService.deleteProfilePicture(id).subscribe({
      next: () => {
        this.ngOnInit();
      },
      error: err => {
        if (!environment.production) {
          console.error('Error: ', err);
        }
      }
    });
  }

  deleteBannerPicture(id) {
    this._userService.deleteBannerPicture(id).subscribe({
      next: () => {
        this.ngOnInit();
      },
      error: err => {
        if (!environment.production) {
          console.error('Error: ', err);
        }
      }
    });
  }

  showDialogShowPicture(link: string) {
    const dialogRef = this.dialog.open(DialogShowPictureComponent, {
      width: '500px',
      data: {link: link}
    });

    dialogRef.afterClosed().subscribe(() => {
    });
  }
}
