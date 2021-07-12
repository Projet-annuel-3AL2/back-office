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

const appRoutes: Routes= [
  {path: 'login', component: LoginComponent, canActivate: [NegateAuthGuardService]},
  {path: '', component: PageUsersComponent, canActivate: [AuthGuardService]},
  {path: 'organisations', component: PageOrganisationsComponent, canActivate: [AuthGuardService]},
  {path: 'organisation/:id', component: PageOrganisationComponent, canActivate: [AuthGuardService]},
  {path: 'organisation/requests/all', component: PageRequestOrganisationComponent, canActivate: [AuthGuardService]},
  {path: 'events', component: PageListEventComponent, canActivate: [AuthGuardService]},
  {path: 'event/:id', component: PageEventComponent, canActivate: [AuthGuardService]},
  {path: 'categories', component: PageListCategoryComponent, canActivate: [AuthGuardService]},
  {path: 'certifications', component: PageListCertificationComponent, canActivate: [AuthGuardService]},
  {path: 'certification/requests', component: PageRequestsCertificationComponent, canActivate: [AuthGuardService]},
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
