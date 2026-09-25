import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [CommonModule, FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {

  username = '';
  password = '';
  errorMessage = '';

  private apiUrl = 'https://localhost:7191/api/Auth/login';

  constructor(
    private http: HttpClient,
    private router: Router
  ) {}

  login() {
    this.errorMessage = '';

    this.http.post<any>(this.apiUrl, {
      username: this.username,
      password: this.password
    }).subscribe({
      next: (response) => {
        localStorage.setItem('token', response.token);
        this.router.navigate(['/appointments']);
      },
      error: () => {
        this.errorMessage = 'Username or password is incorrect.';
      }
    });
  }
}