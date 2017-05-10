
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, Router } from '@angular/router';

import { AuthenticationService } from './user/authentication.service';

@Injectable()
export class AuthGuard implements CanActivate {
    constructor( 
        private authService: AuthenticationService,
        private router: Router
     ) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        if (!this.authService.isAuth()) {
            this.router.navigate(['login']);
            return false;
        }
        return true;
    }
}