import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {NegateAuthGuardService} from "./services/auth/negate-auth-guard";
import {LoginComponent} from "./components/page_/auth_/login/login.component";
import {AuthGuardService} from "./services/auth/auth-guard.service";
import {PageUsersComponent} from "./components/page_/page-users/page-users.component";

const appRoutes: Routes= [
  {path: 'login', component: LoginComponent, canActivate: [NegateAuthGuardService]},
  {path: '', component: PageUsersComponent, canActivate: [AuthGuardService]},
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
