import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {OrganisationMembership} from "../../../shared/models/organisation_membership.model";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {Post} from "../../../shared/models/post.model";
import {UserService} from "../../../services/user/user.service";
import {ActivatedRoute} from "@angular/router";
import {environment} from "../../../../environments/environment";
import {ReportService} from "../../../services/report/report.service";
import {PostService} from "../../../services/post/post.service";

@Component({
  selector: 'app-page-list-posts-user',
  templateUrl: './page-list-posts-user.component.html',
  styleUrls: ['./page-list-posts-user.component.css']
})
export class PageListPostsUserComponent implements OnInit, AfterViewInit {

  username: string;
  displayedColumns: string[] = ['text', 'nbReport','createdAt', 'actions', 'open'];
  dataSource: MatTableDataSource<Post>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  env: any;

  constructor(public _userService: UserService,
              public _postService: PostService,
              public _reportService: ReportService,
              private activatedRoute: ActivatedRoute) {
    this.env = environment;
  }

  async ngOnInit(): Promise<void> {
    await this.updateData();
  }

  private async updateData() {
    this.username = this.activatedRoute.snapshot.paramMap.get("username");
    this._userService.getByUsername(this.username).subscribe({
      error: err => {
        if (!environment.production) {
          console.log('Error: ', err);
        }
      }
    });
    this._postService.getAllPostFromUser(this.username).subscribe({
      error: err => {
        if (!environment.production) {
          console.log('Error: ', err);
        }
      }
    });
    await this._postService.posts.subscribe(posts => {
      this.dataSource = new MatTableDataSource(posts);
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

  removePost(id) {
    this._postService.removePost(id).subscribe({
      next: () => {
        this.updateData();
      },
      error: err => {
        if (!environment.production){
          console.error(err)
        }
      }
    })
  }
}
