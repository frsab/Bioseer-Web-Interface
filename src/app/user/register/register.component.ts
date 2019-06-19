import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import {AuthenticationService} from '../../_services/authentication.service';
import {User} from '../../_models/user.model';

/**
 * Handles user registration
 */
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  formGroup: FormGroup;
  titleAlert = 'This field is required';
  post: any = '';
  allUsers: [User]; // All currently registered users for checking
  success: boolean;
  submitted = false;

  constructor(
    private formBuilder: FormBuilder,
    private authenticationService: AuthenticationService
  ) { }

  /**
   * Creates a new form and gets a list of all the users to check that email and username arent in use
   */
  ngOnInit() {
    this.createForm();
    this.authenticationService.getAlUsers().subscribe((res) => {
      this.allUsers = res;
    });
  }

  /**
   * Creates a new form with validators
   */
  createForm() {
    const emailregex: RegExp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    this.formGroup = this.formBuilder.group({
      email: [null, [Validators.required, Validators.pattern(emailregex)], this.checkInUseEmail.bind(this)],
      firstName: [null, Validators.required],
      lastName: [null, Validators.required],
      username: [null, [Validators.required], this.checkInUseUsername.bind(this)],
      password: [null, [Validators.required, this.checkPassword]],
      validate: ''
    });
  }

  // Gets the first name from the form control
  get firstName() {
    return this.formGroup.get('firstName') as FormControl;
  }

  // Gets the last name from the Form Control
  get lastName() {
    return this.formGroup.get('lastName') as FormControl;
  }

  /**
   * Checks if the password is in use against the database
   * @param control Form control object
   */
  checkPassword(control) {
    const enteredPassword = control.value;
    const passwordCheck = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})/;
    return (!passwordCheck.test(enteredPassword) && enteredPassword) ? { requirements: true } : null;
  }

  /**
   * Checks if the email is in use against the database
   * @param control Form control object
   */
  checkInUseEmail(control) {
    return new Observable(observer => {
      const result = this.allUsers.some(el => el.email === control.value) ? { alreadyInUse: true} : null;
      observer.next(result);
      observer.complete();
    });
  }

  /**
   * Checks if username is already in use
   * @param control Form object
   */
  checkInUseUsername(control) {
    return new Observable(observer => {
      const result = this.allUsers.some(el => el.username === control.value) ? { alreadyInUse: true} : null;
      observer.next(result);
      observer.complete();
    });
  }

  /**
   * Handles email error codes
   */
  getErrorEmail() {
    return this.formGroup.get('email').hasError('required') ? 'Field is required' :
      this.formGroup.get('email').hasError('pattern') ? 'Not a valid email address' :
        this.formGroup.get('email').hasError('alreadyInUse') ? 'This email address is already in use' : '';
  }

  /**
   * Handles username error codes
   */
  getErrorUsername() {
    return this.formGroup.get('username').hasError('required') ? 'Field is Required' :
      this.formGroup.get('username').hasError('alreadyInUse') ? 'This username is already in use' : '';
  }

  /**
   * Handles password error codes
   */
  getErrorPassword() {
    return this.formGroup.get('password').hasError('required') ? 'Field is required (at least eight characters, one uppercase letter and one number)' :
      this.formGroup.get('password').hasError('requirements') ? 'Password needs to be at least eight characters, one uppercase letter and one number' : '';
  }

  /**
   * Submits form and sets success
   * @param post Form
   */
  onSubmit(post) {
    this.submitted = true;
    this.authenticationService.register(post.email, post.username, post.firstName, post.lastName, post.password).subscribe((res) => {
      res.message === 'Registered' ? this.success = true : this.success = false;
    });
  }

}
