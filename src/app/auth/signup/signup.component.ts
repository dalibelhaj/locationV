import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
//creation de form et le onsubmit
signUpForm: FormGroup ;
errorMessage: string  ;

  constructor(private formBuilder : FormBuilder, 
              private authservice:AuthService,
              private router:Router ) { }

  ngOnInit(): void {
    this.initForm(); 
  }
// "/[0-9a-Az-Z]{6,}/"
initForm(){
  this.signUpForm=this.formBuilder.group({
email:['',[Validators.required,Validators.email]],
password:['',[Validators.required,Validators.pattern("^([A-Za-z0-9_\\-\\.]){6,}")]],

  });
}
onSubmit(){
  
  const email = this.signUpForm.get('email').value;
  const password = this.signUpForm.get('password').value;
  this.authservice.createNewUser(email,password).then(
    ()=> {
      this.router.navigate(['/voiture']);
    },
    (error) => {
    this.errorMessage= error;
    }
    );
  
}

}
