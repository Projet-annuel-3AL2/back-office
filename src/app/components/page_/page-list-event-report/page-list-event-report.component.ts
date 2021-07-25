import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {Report} from "../../../shared/models/report.model";
import {ReportService} from "../../../services/report/report.service";
import {environment} from "../../../../environments/environment";
import {EventService} from "../../../services/event/event.service";

@Component({
  selector: 'app-page-list-event-report',
  templateUrl: './page-list-event-report.component.html',
  styleUrls: ['./page-list-event-report.component.css']
})
export class PageListEventReportComponent implements OnInit, AfterViewInit {

  displayedColumns: string[] = ['userReporter', 'text', 'reportedEvent','nbReport', 'createdAt','action', 'open'];
  dataSource: MatTableDataSource<Report>
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  env: any;

  constructor(public _reportService: ReportService,
              private _eventService: EventService) {
    this.env = environment;
  }

  async ngOnInit(): Promise<void> {
    await this.updateData();
  }

  private async updateData() {
    this._reportService.getEventReports().subscribe({
      error: err => {
        if (!environment.production) {
          console.error('Error: ', err);
        }
      }
    });
    await this._reportService.reports.subscribe(reports => {
      if (reports !== null){

        this.dataSource = new MatTableDataSource(reports);
      }
    });
  }

  ngAfterViewInit() {
    if (this.dataSource !== undefined){
      this.dataSource.paginator = this.paginator;
      this.sort !== null?this.dataSource.sort = this.sort: null;
    }

  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  deleteReport(reportId: string){
    this._reportService.removeReport(reportId).subscribe({
      next: () => {
        this.updateData();
      },
      error: err => {
        if (!environment.production) {
          console.error('Error: ', err);
        }
      }
    });
  }

  removeEvent(id: string) {
    this._eventService.deleteEvent(id).subscribe({
      next: () => {
        this.updateData();
      },
      error: err => {
        if (!environment.production) {
          console.error('Error: ', err);
        }
      }
    })
  }
}
