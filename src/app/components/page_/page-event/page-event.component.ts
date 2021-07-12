import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {OrganisationMembership} from "../../../shared/models/organisation_membership.model";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {User} from "../../../shared/models/user.model";
import {EventService} from "../../../services/event/event.service";
import {ActivatedRoute} from "@angular/router";
import {environment} from "../../../../environments/environment";

@Component({
  selector: 'app-page-event',
  templateUrl: './page-event.component.html',
  styleUrls: ['./page-event.component.css']
})
export class PageEventComponent implements OnInit, AfterViewInit {

  eventId: string;
  displayedColumns: string[] = ['user', 'id'];
  dataSource: MatTableDataSource<User>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(public _eventService: EventService,
              private _activatedRoute: ActivatedRoute) { }

  async ngOnInit(): Promise<void> {
    await this.updateData();
  }

  private async updateData() {
    this.eventId = this._activatedRoute.snapshot.paramMap.get("id");
    this._eventService.getById(this.eventId).subscribe({
      error: err => {
        if (!environment.production) {
          console.log('Error: ', err);
        }
      }
    });
    this._eventService.getEventMembers(this.eventId).subscribe({
      error: err => {
        if (!environment.production) {
          console.log('Error: ', err);
        }
      }
    });
    await this._eventService.participations.subscribe(participations => {
      this.dataSource = new MatTableDataSource(participations);
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

  removeParticipant(id) {
    this._eventService.deleteParticipantEvent(id, this.eventId).subscribe({
      next: async () => {
        await this.updateData();
      },
      error: err => {
        if (!environment.production){
          console.log('Error: ', err);
        }
      }
    });
  }
}
