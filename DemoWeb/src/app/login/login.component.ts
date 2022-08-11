import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from 'src/shared/services/auth/auth.service';
import { Router } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MaterialModule } from 'src/shared/modules/material/material.module';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
		MaterialModule,
    ReactiveFormsModule
  ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  public loginFormGroup = new FormGroup({
    anvandarnamn: new FormControl<string>('', [Validators.required, Validators.minLength(1)]),
    losenord: new FormControl<string>('', [Validators.required, Validators.minLength(8)])
  });

  public submitting = false;

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
    this.handleAuth();
  }

  private handleAuth() {
    const isAuth = localStorage.getItem('isAuth');

    if (isAuth) {
      this.authService.isAuth.next(true);
      this.router.navigate(['']);
    } else {
      this.authService.isAuth.next(false);
    }
  }

  public onSubmit() {
    this.submitting = true;

    setTimeout(() => {
      this.submitting = false;
      localStorage.setItem('isAuth', 'true');
      this.authService.isAuth.next(true);
      this.router.navigate(['']);
    }, 2000);
  }
}
