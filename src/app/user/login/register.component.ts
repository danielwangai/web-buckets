import { Component } from '@angular/core';
import { Router } from '@angular/router';
 
import { AuthenticationService } from '../authentication.service';
 
@Component({
    moduleId: module.id,
    templateUrl: 'register.component.html',
    styleUrls: ['login.component.css'],
})
 
export class RegisterComponent {
    model: any = {};
    loading = false;
 
    constructor(
        private router: Router,
        private userService: AuthenticationService
        // private alertService: AlertService
        ) { }
 
    register() {
        this.loading = true;
        this.userService.register(this.model)
            .subscribe(
                data => {
                    // this.alertService.success('Registration successful', true);
                    this.router.navigate(['/login']);
                },
                error => {
                    // this.alertService.error(error._body);
                    this.loading = false;
                });
    }
}