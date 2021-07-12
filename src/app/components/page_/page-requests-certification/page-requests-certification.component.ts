import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {OrganisationRequest} from "../../../shared/models/organisation_request.model";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {CertificationService} from "../../../services/certification/certification.service";
import {environment} from "../../../../environments/environment";
import {Observable} from "rxjs";

class certificationRequests {
}

@Component({
  selector: 'app-page-requests-certification',
  templateUrl: './page-requests-certification.component.html',
  styleUrls: ['./page-requests-certification.component.css']
})
export class PageRequestsCertificationComponent implements OnInit, AfterViewInit {

  displayedColumns: string[] = ['user', 'comment','certificationRequestStatus', 'createdAt', 'id'];
  dataSource: MatTableDataSource<certificationRequests>
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(public _certificationService: CertificationService) { }

  async ngOnInit(): Promise<void> {
    await this.updateData();
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

  approveRequest(id) {
    this._certificationService.approveRequest(id).subscribe({
      next: async () => {
        await this.updateData()
      },
      error: err => {
        if (!environment.production) {
          console.error('Error: ', err);
        }
      }
    });
  }

  rejectRequest(id) {
    this._certificationService.rejectRequest(id).subscribe({
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

  private async updateData() {
    this._certificationService.getAllRequests().subscribe({
      error: err => {
        if (!environment.production) {
          console.error('Error: ', err);
        }
      }
    });
    await this._certificationService.certificationRequests.subscribe(certificationRequests => {
      this.dataSource = new MatTableDataSource(certificationRequests);
    })
  }
}
