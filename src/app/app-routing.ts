import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {NegateAuthGuardService} from "./services/auth/negate-auth-guard";
import {LoginComponent} from "./components/page_/auth_/login/login.component";
import {AuthGuardService} from "./services/auth/auth-guard.service";
import {PageUsersComponent} from "./components/page_/page-users/page-users.component";
import {PageOrganisationsComponent} from "./components/page_/page-organisations/page-organisations.component";
import {PageOrganisationComponent} from "./components/page_/page-organisation/page-organisation.component";
import {PageRequestOrganisationComponent} from "./components/page_/page-request-organisation/page-request-organisation.component";
import {PageListCertificationComponent} from "./components/page_/page-list-certification/page-list-certification.component";
import {PageRequestsCertificationComponent} from "./components/page_/page-requests-certification/page-requests-certification.component";
import {PageEventComponent} from "./components/page_/page-event/page-event.component";
import {PageListEventComponent} from "./components/page_/page-list-event/page-list-event.component";
import {PageListCategoryComponent} from "./components/page_/page-list-category/page-list-category.component";
import {AdminGuardService} from "./services/auth/admin-guard";
import {ErrorPageComponent} from "./components/error-page/error-page.component";

const appRoutes: Routes= [
  {path: 'login', component: LoginComponent, canActivate: [NegateAuthGuardService]},
  {path: 'error', component: ErrorPageComponent},
  {path: '', component: PageUsersComponent, canActivate: [AuthGuardService, AdminGuardService]},
  {path: 'organisations', component: PageOrganisationsComponent, canActivate: [AuthGuardService, AdminGuardService]},
  {path: 'organisation/requests', component: PageRequestOrganisationComponent, canActivate: [AuthGuardService, AdminGuardService]},
  {path: 'organisation/:id', component: PageOrganisationComponent, canActivate: [AuthGuardService, AdminGuardService]},
  {path: 'events', component: PageListEventComponent, canActivate: [AuthGuardService, AdminGuardService]},
  {path: 'event/:id', component: PageEventComponent, canActivate: [AuthGuardService, AdminGuardService]},
  {path: 'categories', component: PageListCategoryComponent, canActivate: [AuthGuardService, AdminGuardService]},
  {path: 'certifications', component: PageListCertificationComponent, canActivate: [AuthGuardService, AdminGuardService]},
  {path: 'certification/requests', component: PageRequestsCertificationComponent, canActivate: [AuthGuardService, AdminGuardService]},
  {path: 'reports/users', component: PageRequestsCertificationComponent, canActivate: [AuthGuardService, AdminGuardService]},
  {path: 'reports/organisations', component: PageRequestsCertificationComponent, canActivate: [AuthGuardService, AdminGuardService]},
  {path: 'reports/events', component: PageRequestsCertificationComponent, canActivate: [AuthGuardService, AdminGuardService]},
  {path: 'reports/posts', component: PageRequestsCertificationComponent, canActivate: [AuthGuardService, AdminGuardService]},
  {path: 'reports/groups', component: PageRequestsCertificationComponent, canActivate: [AuthGuardService, AdminGuardService]},
  {path: '**', redirectTo:"/"}
];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(appRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule {

}
