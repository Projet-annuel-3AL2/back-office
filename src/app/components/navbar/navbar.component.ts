import { Component, OnInit } from '@angular/core';
import {AuthService} from "../../services/auth/auth.service";
import {faBell, faUserFriends} from '@fortawesome/free-solid-svg-icons';
import {Router} from "@angular/router";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  faBell = faBell;
  faUserFriends = faUserFriends;

  constructor(public _authService: AuthService,
              private _router: Router) { }

  ngOnInit(): void {
  }

  public onDisconnect() {
    this._authService.logout().subscribe(() => this._router.navigate(['../login']));
  }

}
