
import { Component, inject, model, signal } from '@angular/core';
import { FormsModule, ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../service/user.service';


export interface Credentials{
  email: string,
  password : string
}

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})


export class RegisterComponent {
  private router = inject(Router)
  private formBuilder = inject(FormBuilder);
  userservice = inject(UserService);
  registerFormGroup = this.formBuilder.group({
    'email': [''],
    'password': ['']
  });
  errorMessage = {
    email : '',
    password : ''
  };

  invalidCredentials = false;

  apiRegister() {
    this.userservice.registerUser(this.registerFormGroup.value as Credentials).subscribe(
      {
        next: result => {

          this.router.navigate(["/login"])
        },
        error: error => {
          console.log(error.error.password, error.error.email);
          this.errorMessage.email = error.error.email;
          this.errorMessage.password = error.error.password;
          
          this.invalidCredentials = true;
        }
      },
    )

  }

  register(){
    this.router.navigate(["/login"]);
  }
}
