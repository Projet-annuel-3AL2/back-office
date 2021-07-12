import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {OrganisationRequest} from "../../../shared/models/organisation_request.model";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {CertificationService} from "../../../services/certification/certification.service";
import {environment} from "../../../../environments/environment";
import {Certification} from "../../../shared/models/certification.model";

@Component({
  selector: 'app-page-list-certification',
  templateUrl: './page-list-certification.component.html',
  styleUrls: ['./page-list-certification.component.css']
})
export class PageListCertificationComponent implements OnInit, AfterViewInit {

  displayedColumns: string[] = ['user', 'issuer','createdAt', 'id'];
  dataSource: MatTableDataSource<Certification>
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(public _certificationService: CertificationService) { }

  async ngOnInit(): Promise<void> {
    await this.updateData();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.sort !== null?this.dataSource.sort = this.sort: [];
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  removeCertification(id) {
    this._certificationService.removeCertification(id).subscribe({
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
    this._certificationService.getAll().subscribe({
      error: err => {
        if (!environment.production) {
          console.error('Error: ', err);
        }
      }
    });
    await this._certificationService.certifications.subscribe(certifications => {
      this.dataSource = new MatTableDataSource(certifications);
    })
  }
}
