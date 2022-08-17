import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  form: any = {
    email: null,
    username: null,
    password: null,
    firstName: null,
    lastName: null,
    city: null,
    state: null,
    country: null,
    dateOfBirth: null
  }
  userAlreadyExists: boolean = false;
  isLoggedIn: boolean = false;
  accountCreationFailed: boolean = false;
  errorMsg = "";
  Id!: number;

  constructor(private authService: AuthService, private storageService: StorageService) { }

  ngOnInit(): void {

  }

  onSubmit(): void {
    const {email, username, password, firstName, 
           lastName, city, state, country, dateOfBirth} = this.form;
    
    this.authService.register(username, email, password, 
      firstName, lastName, city, state, country, dateOfBirth).subscribe({
      next: (data: any) => {
        
        console.log(data);
        this.accountCreationFailed = false;
        this.isLoggedIn = true;
        this.redirectPage();
      },
      error: err => {
        this.errorMsg = err.error.message;
        this.accountCreationFailed = true;
      }
    });
    console.log("onSubmit called")
  }

  reloadPage(): void {
    window.location.reload();
  }
  redirectPage(): void {
    window.location.href = `/login`
  }

}
