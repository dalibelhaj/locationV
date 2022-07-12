import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase/app';
import 'firebase/auth';
import { AuthService } from '../services/auth.service';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
  

})

export class HeaderComponent implements OnInit {
  bgImageVariable="assets/images/hero_1.jpg";
//declare si l'utilisateur est connecter ou non
  isAuth:boolean;
  
  constructor(private authservise:AuthService) {
    
   }

  ngOnInit(): void {
    firebase.auth().onAuthStateChanged(
      (user)=> {
        if (user){
          this.isAuth =true;
        }else{
          this.isAuth=false;
        }
      }
    );
  }
  onSignOut(){
    this.authservise.signOutUser();
  }

}
