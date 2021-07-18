import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import {MaterialModule} from "./material.module";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {GlobalHttpInterceptor} from "./shared/interceptors/GlobalHhtpInterceptor";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {RouterModule} from "@angular/router";
import {CommonModule} from "@angular/common";
import {FlexLayoutModule} from "@angular/flex-layout";
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";
import {NavbarComponent} from "./components/navbar/navbar.component";
import {LoginComponent} from "./components/page_/auth_/login/login.component";
import {AppRoutingModule} from "./app-routing";
import {PageUsersComponent} from "./components/page_/page-users/page-users.component";
import {DialogShowPictureComponent} from "./components/dialog_/dialog-show-picture/dialog-show-picture.component";
import {PageOrganisationsComponent} from "./components/page_/page-organisations/page-organisations.component";
import {PageOrganisationComponent} from "./components/page_/page-organisation/page-organisation.component";
import {PageRequestOrganisationComponent} from "./components/page_/page-request-organisation/page-request-organisation.component";
import {PageListCertificationComponent} from "./components/page_/page-list-certification/page-list-certification.component";
import {PageRequestsCertificationComponent} from "./components/page_/page-requests-certification/page-requests-certification.component";
import {PageListEventComponent} from "./components/page_/page-list-event/page-list-event.component";
import {PageEventComponent} from "./components/page_/page-event/page-event.component";
import {PageListCategoryComponent} from "./components/page_/page-list-category/page-list-category.component";
import {DialogCreateCategoryComponent} from "./components/dialog_/dialog-create-category/dialog-create-category.component";
import {DialogUpdateCategoryComponent} from "./components/dialog_/dialog-update-category/dialog-update-category.component";
import {CookieService} from "ngx-cookie-service";
import {ErrorPageComponent} from "./components/error-page/error-page.component";
import {PageListEventReportComponent} from "./components/page_/page-list-event-report/page-list-event-report.component";
import {PageListGroupReportComponent} from "./components/page_/page-list-group-report/page-list-group-report.component";
import {PageListOrganisationReportComponent} from "./components/page_/page-list-organisation-report/page-list-organisation-report.component";
import {PageListPostReportComponent} from "./components/page_/page-list-post-report/page-list-post-report.component";
import {PageListUserReportComponent} from "./components/page_/page-list-user-report/page-list-user-report.component";
import {PageListPostsUserComponent} from "./components/page_/page-list-posts-user/page-list-posts-user.component";

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    LoginComponent,
    PageUsersComponent,
    PageUsersComponent,
    DialogShowPictureComponent,
    PageOrganisationsComponent,
    PageOrganisationComponent,
    PageRequestOrganisationComponent,
    PageListCertificationComponent,
    PageRequestsCertificationComponent,
    PageListEventComponent,
    PageEventComponent,
    PageListCategoryComponent,
    DialogCreateCategoryComponent,
    DialogUpdateCategoryComponent,
    ErrorPageComponent,
    PageListEventReportComponent,
    PageListGroupReportComponent,
    PageListOrganisationReportComponent,
    PageListPostReportComponent,
    PageListUserReportComponent,
    PageListPostsUserComponent
  ],
  imports: [
    BrowserModule,
    MaterialModule,
    RouterModule,
    CommonModule,
    FlexLayoutModule,
    HttpClientModule,
    FontAwesomeModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule
  ],
  exports: [MaterialModule],
  providers: [CookieService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: GlobalHttpInterceptor,
      multi: true
    }],
  bootstrap: [AppComponent]
})
export class AppModule { }
