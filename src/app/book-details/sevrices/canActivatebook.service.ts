import {
  CanActivate, Router,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  CanActivateChild
} from '@angular/router';
import { Injectable } from '@angular/core';


@Injectable()
export class BookDetailsGuardService implements CanActivateChild {

  constructor(private _router: Router) { }

  canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean   {
    console.log("Router", this._router)
    console.log("route", childRoute)
    console.log("state", state)
    return true
  }
}
