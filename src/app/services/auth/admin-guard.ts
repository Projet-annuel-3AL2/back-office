import {Injectable} from "@angular/core";
import {CanActivate, Router, UrlTree} from "@angular/router";
import {AuthService} from "./auth.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {UserType} from "../../shared/models/user.model";

@Injectable({
  providedIn: 'root'
})
export class AdminGuardService implements CanActivate {
  constructor(public auth: AuthService, public router: Router, private snackBar: MatSnackBar) {
  }

  async canActivate(): Promise<boolean | UrlTree> {
    const user = await this.auth.getCurrentUser().toPromise();
    if (user && user.userType === UserType.USER) {
      this.snackBar.open("Vous devez avoir les droits d'administration", "Fermer")
      return this.router.parseUrl('error');
    }
    return true;
  }
}
