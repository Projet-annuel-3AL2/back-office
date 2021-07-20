import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {MatDialog} from "@angular/material/dialog";
import {EventService} from "../../../services/event/event.service";
import {Event as EventModel} from "../../../shared/models/event.model";
import {DialogShowPictureComponent} from "../../dialog_/dialog-show-picture/dialog-show-picture.component";
import {environment} from "../../../../environments/environment";

@Component({
  selector: 'app-page-list-event',
  templateUrl: './page-list-event.component.html',
  styleUrls: ['./page-list-event.component.css']
})
export class PageListEventComponent implements OnInit, AfterViewInit {

  displayedColumns: string[] = ['name', 'picture', 'startDate', 'endDate','id', 'open'];
  dataSource: MatTableDataSource<EventModel>
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  env: any;

  constructor(public dialog: MatDialog,
              public _eventService: EventService) {
    this.env = environment
  }

  async ngOnInit(): Promise<void> {
    await this.updateData()
  }

  private async updateData() {
    this._eventService.getAllEvent().subscribe({
      error: err => {
        if (!environment.production) {
          console.error('Error: ', err);
        }
      }
    });
    await this._eventService.events.subscribe( events => {
      console.log(events)
      this.dataSource = new MatTableDataSource<EventModel>(events);
    });
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.sort !== null?this.dataSource.sort = this.sort: null;
  }

  showDialogShowPicture(link: string) {
    const dialogRef = this.dialog.open(DialogShowPictureComponent, {
      width: '800px',
      data: {link: link}
    });

    dialogRef.afterClosed().subscribe(() => {
    });
  }

  deleteEvent(id: string) {
    this._eventService.deleteEvent(id).subscribe({
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

  deleteProfilePicture(id: string) {
    this._eventService.deleteProfilePicture(id).subscribe({
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

  deleteBannerPicture(id: string) {
    this._eventService.deleteBannerPicture(id).subscribe({
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

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
