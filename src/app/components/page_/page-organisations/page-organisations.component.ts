import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {DialogShowPictureComponent} from "../../dialog_/dialog-show-picture/dialog-show-picture.component";
import {MatDialog} from "@angular/material/dialog";
import {OrganisationService} from "../../../services/organisation/organisation.service";
import {MatTableDataSource} from "@angular/material/table";
import {User} from "../../../shared/models/user.model";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {environment} from "../../../../environments/environment";
import {Organisation} from "../../../shared/models/organisation.model";

@Component({
  selector: 'app-page-organisations',
  templateUrl: './page-organisations.component.html',
  styleUrls: ['./page-organisations.component.css']
})
export class PageOrganisationsComponent implements OnInit, AfterViewInit {

  displayedColumns: string[] = ['name', 'profilePicture', 'bannerPicture', 'id'];
  dataSource: MatTableDataSource<Organisation>
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(public dialog: MatDialog,
              public _organisationService: OrganisationService) { }

  async ngOnInit(): Promise<void> {
    this._organisationService.getAllOrganisation().subscribe({
      error: err => {
        if (!environment.production) {
          console.error('Error: ', err);
        }
      }
    });
    await this._organisationService.organisations.subscribe(organisations => {
      this.dataSource = new MatTableDataSource(organisations)
    })
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.sort !== null?this.dataSource.sort = this.sort: null;
  }

  showDialogShowPicture(link: string) {
    const dialogRef = this.dialog.open(DialogShowPictureComponent, {
      width: '500px',
      data: {link: link}
    });

    dialogRef.afterClosed().subscribe(() => {
    });
  }

  deleteOrganisation(id: string) {
    this._organisationService.deleteOrganisation(id).subscribe({
      next: () => {

      },
      error: err => {
        if (!environment.production) {
          console.error('Error: ', err);
        }
      }
    });
  }

  deleteProfilePicture(id: string) {
    this._organisationService.deleteProfilePicture(id).subscribe({
      next: () => {

      },
      error: err => {
        if (!environment.production) {
          console.error('Error: ', err);
        }
      }
    });
  }

  deleteBannerPicture(id: string) {
    this._organisationService.deleteBannerPicture(id).subscribe({
      next: () => {

      },
      error: err => {
        if (!environment.production) {
          console.error('Error: ', err);
        }
      }
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
