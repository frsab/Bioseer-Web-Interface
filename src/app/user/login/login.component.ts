import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {AuthenticationService} from '../../_services/authentication.service';
import {first} from 'rxjs/operators';
import {User} from '../../_models/user.model';
import {Observable} from 'rxjs';

/**
 * Component for logging in the user
 */
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  formGroup: FormGroup; // Formgroup reference object
  titleAlert = 'This field is required'; // Required alert
  post: any = '';
  submitted = false; // If Submitted
  returnUrl: string; // Return URL
  error = ''; // Error

  /**
   *
   * @param formBuilder FormBuilder reference
   * @param route ActivatedRouter reference
   * @param router Router reference
   * @param authenticationService AuthenticationService reference
   */
  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthenticationService
  ) {
  }

  /**
   * Creates the form, logs out user, and takes snapshot of old route
   */
  ngOnInit() {
    this.createForm();
    // reset login status
    this.authenticationService.logout();
    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams.returnUrl || '/';
  }

  /**
   * Builds form
   */
  createForm() {
    this.formGroup = this.formBuilder.group({
      username: [null, [Validators.required]],
      password: [null, [Validators.required]],
      validate: ''
    });
  }

  /**
   * Once user submits send data and return to old address or throws error
   * @param post Reference to the form
   */
  onSubmit(post) {
    // Logs in user
    this.authenticationService.login(post.username, post.password)
      .pipe(first())
      .subscribe(
        data => {
          // Navigates to previous user position
          this.submitted = true;
          this.router.navigate([this.returnUrl]);
        },
        error => {
          // Throws error
          this.error = error;
        });
  }
}
