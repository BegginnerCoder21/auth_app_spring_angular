import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Credentials } from '../register/register.component';
import { UserService } from '../service/user.service';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {
  userService = inject(UserService);
  ngOnInit(): void {
   this.userService.isCredentials = false;
  //  this.userService.isRegistred = false;
  
 }
  private router = inject(Router);
  private formBuilder = inject(FormBuilder);
	loginFormGroup = this.formBuilder.group({
 		'email': [''],
 		'password': ['']
 	});

  
 	invalidCredentials = false;
  // user = { email: '', password: '' };
  apiLogin() {
    this.userService.loginUser(this.loginFormGroup.value as Credentials).subscribe(
      {
        next: result => {
          if(!this.userService.isCredentials){
             this.router.navigate(["/home"]);
          }
          // this.router.navigate(["/home"]);
        },
        error: error => {
          this.invalidCredentials = true
        }
      },
    )
  }

  
  login(){
    
    this.router.navigate(["/register"]);
  }
}
