import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-loginDw',
  standalone: true,
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './loginDw.component.html',
  styleUrls: ['./loginDw.component.css']
})
export class LoginDwComponent implements OnInit {
  loginForm!: FormGroup;

  constructor(private formBuilder: FormBuilder, private router: Router) { }

  ngOnInit() {
    this.validateForms();
  }

  validateForms(){
    this.loginForm = this.formBuilder.group({
      user: ['', [Validators.required, Validators.pattern(/^\S*$/)]], 
      password: ['', [Validators.required, Validators.pattern(/^\S*$/)]] 
    });
  }

  getErrorMessage(controlName: string): string | null {
    const control = this.loginForm.get(controlName);
  
    if (control?.hasError('required')) {
      return 'Este campo es obligatorio.';
    }
  
    if (control?.hasError('pattern')) {
      return 'Por favor, digite correctamente el campo.';
    }
  
    return null;
  }

  adminDwLogin(){
    this.router.navigate(['/admin']);
  }
}
