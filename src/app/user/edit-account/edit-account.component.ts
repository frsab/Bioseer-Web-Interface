import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {AuthenticationService} from '../../_services/authentication.service';
import {User} from '../../_models/user.model';
import {first} from 'rxjs/operators';

/**
 * For editing the users account
 */
@Component({
  selector: 'app-edit-account',
  templateUrl: './edit-account.component.html',
  styleUrls: ['./edit-account.component.scss']
})
export class EditAccountComponent implements OnInit {

  editForm: FormGroup; // Form group instance
  currentUser: User; // Current user
  loading = false; // If loading
  submitted = false; // If Sumitted
  returnUrl: string; // Return URL
  error = ''; // Error if there is one

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthenticationService
  ) { }

  /**
   * Gets the current user
   * Builds the form
   * Gets the return URL once user is edited
   */
  ngOnInit() {
    this.authenticationService.currentUser.subscribe(value => {
      this.currentUser = value;
    });

    this.editForm = this.formBuilder.group({
      username: [this.currentUser.username, Validators.required],
      firstName: [this.currentUser.firstName, Validators.required],
      lastName: [this.currentUser.lastName, Validators.required]
    });

    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams.returnUrl || '/';
  }

  /**
   * Gets the form controls
   */
  get f() { return this.editForm.controls; }

  /**
   * Submits form, sends post request
   */
  onSubmit() {
    this.submitted = true; // Sets submitted to true

    // stop here if form is invalid
    if (this.editForm.invalid) {
      return;
    }

    this.loading = true; // Sets loading to true
    // Calls edit user, passed in form controls
    this.authenticationService.editUser(this.f.username.value, this.f.firstName.value, this.f.lastName.value, this.currentUser._id)
      .pipe(first())
      .subscribe(
        data => {
          // Navigate to previous route
          this.router.navigate([this.returnUrl]);
        },
        error => {
          // Throws error
          this.error = error;
          this.loading = false;
        });
  }


}
