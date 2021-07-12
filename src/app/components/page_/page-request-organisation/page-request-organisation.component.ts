import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {Organisation} from "../../../shared/models/organisation.model";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {OrganisationRequest} from "../../../shared/models/organisation_request.model";
import {OrganisationService} from "../../../services/organisation/organisation.service";
import {environment} from "../../../../environments/environment";
import {Observable} from "rxjs";

@Component({
  selector: 'app-page-request-organisation',
  templateUrl: './page-request-organisation.component.html',
  styleUrls: ['./page-request-organisation.component.css']
})
export class PageRequestOrganisationComponent implements OnInit, AfterViewInit {

  displayedColumns: string[] = ['user', 'name', 'comment', 'createdAt', 'id'];
  dataSource: MatTableDataSource<OrganisationRequest>
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  constructor(public _organisationService: OrganisationService) { }

  async ngOnInit(): Promise<void> {
    this._organisationService.getRequests().subscribe({
      error: err => {
        if (!environment.production) {
          console.error('Error: ', err);
        }
      }
    });
    await this._organisationService.organisationRequests.subscribe(organisationRequest => {
      this.dataSource = new MatTableDataSource(organisationRequest);
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

  acceptRequest(id: string) {
    this._organisationService.acceptRequest(id).subscribe({
      next: () => {

      },
      error: err => {
        if (!environment.production) {
          console.error('Error: ', err);
        }
      }
    });
  }

  rejectRequest(id: string) {
    this._organisationService.rejectRequest(id).subscribe({
      next: () => {

      },
      error: err => {
        if (!environment.production) {
          console.error('Error: ', err);
        }
      }
    });
  }

}
