import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {NegateAuthGuardService} from "./services/auth/negate-auth-guard";
import {LoginComponent} from "./components/page_/auth_/login/login.component";

const appRoutes: Routes= [
  {path: 'login', component: LoginComponent, canActivate: [NegateAuthGuardService]},
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
