import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth-service.service';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { User } from '../../interfaces/USer';
import { NgClass, NgIf } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule,RouterLink,ReactiveFormsModule,NgClass,NgIf],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {  // Implement OnInit
  loginForm!: FormGroup;
  submitted = false;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit() {  // Use the OnInit lifecycle hook
    this.loginForm = this.formBuilder.group({
      username: ['', [Validators.email,
        Validators.required,
        Validators.pattern(
          '^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$'
        )]],
      password: ['', Validators.required]
    });
  }

  get f() {
    return this.loginForm.controls;
  }

  login() {
    this.submitted = true;

    if (this.loginForm.invalid) {
      return;
    }

    const user: User = {
      username: this.f['username'].value,
      password: this.f['password'].value
    };

    this.authService.login(user).subscribe((response: boolean) => {
      if (response) {
        this.router.navigate(['/']);
      } else {
        alert('Invalid credentials');  // Display appropriate message to the user
      }
    }, (error: any) => {
      console.error('Login failed', error);
    });
  }
}