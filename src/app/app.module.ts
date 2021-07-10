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

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    LoginComponent,
    PageUsersComponent,
    PageUsersComponent,
    DialogShowPictureComponent,
    PageOrganisationsComponent
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
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: GlobalHttpInterceptor,
      multi: true
    }],
  bootstrap: [AppComponent]
})
export class AppModule { }
