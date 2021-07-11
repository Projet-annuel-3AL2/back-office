import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {OrganisationService} from "../../../services/organisation/organisation.service";
import {ActivatedRoute} from "@angular/router";
import {environment} from "../../../../environments/environment";
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {User} from "../../../shared/models/user.model";
import {OrganisationMembership} from "../../../shared/models/organisation_membership.model";

@Component({
  selector: 'app-page-organisation',
  templateUrl: './page-organisation.component.html',
  styleUrls: ['./page-organisation.component.css']
})
export class PageOrganisationComponent implements OnInit, AfterViewInit {
  organisationId: string;
  displayedColumns: string[] = ['user', 'isAdmin', 'id'];
  dataSource: MatTableDataSource<OrganisationMembership>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(public _organisationService: OrganisationService,
              private _activatedRoute: ActivatedRoute) { }

  async ngOnInit(): Promise<void> {
    this.organisationId = this._activatedRoute.snapshot.paramMap.get("id");
    this._organisationService.getById(this.organisationId).subscribe({
      error: err => {
        if (!environment.production) {
          console.log('Error: ', err);
        }
      }
    });
    this._organisationService.getOrganisationMembership(this.organisationId).subscribe({
      error: err => {
        if (!environment.production) {
          console.log('Error: ', err);
        }
      }
    })
    await this._organisationService.members.subscribe(organisationMembership => {
      this.dataSource = new MatTableDataSource(organisationMembership)
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

  deleteMembership(id) {
    this._organisationService.deleteOrganisationMembership(id, this.organisationId).subscribe({
      next: () =>{

      },
      error: err => {
        if (!environment.production){
          console.log('Error: ', err);
        }
      }
    })
  }

  giveAdmin(id) {
    this._organisationService.giveAdminToMember(id, this.organisationId).subscribe({
      next: () =>{

      },
      error: err => {
        if (!environment.production){
          console.log('Error: ', err);
        }
      }
    })
  }

  removeAdminToAdminMember(id) {
    this._organisationService.removeAdminToAdminMember(id, this.organisationId).subscribe({
      next: () =>{

      },
      error: err => {
        if (!environment.production){
          console.log('Error: ', err);
        }
      }
    })
  }
}
