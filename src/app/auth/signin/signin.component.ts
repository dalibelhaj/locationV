import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit {
  
  signInForm: FormGroup ;
  errorMessage: string  ;
  //creation de form et le onsubmit
    constructor(private formBuilder : FormBuilder, 
                private authservice:AuthService,
                private router:Router ) { }
  
    ngOnInit(): void {
      this.initForm(); 
    }
  // "/[0-9a-Az-Z]{6,}/"
  initForm(){
    this.signInForm=this.formBuilder.group({
  email:['',[Validators.required,Validators.email]],
  password:['',[Validators.required,Validators.pattern("^([A-Za-z0-9_\\-\\.]){6,}")]],
    });
  }
  onSubmit(){
    
    const email = this.signInForm.get('email').value;
    const password = this.signInForm.get('password').value;
    this.authservice.signInUser(email,password).then(
      ()=> {
        this.router.navigate(['/voiture']);
      },
      (error) => {
        console.log(error)
      this.errorMessage= error;
      }
      );
    
  }
}
