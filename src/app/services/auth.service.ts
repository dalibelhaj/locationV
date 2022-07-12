import { Injectable } from '@angular/core';
import * as firebase from 'firebase/app';
import 'firebase/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }
//creation d'un nouvel utilisateur
  createNewUser (email:string ,password:string) {
    return new Promise<void> ((resolve, reject) => {
      firebase.auth().createUserWithEmailAndPassword(email,password).then(
        () =>{
          resolve();
        },
        (error) => {
          reject(error);
        }
        
      );
      
    });
    
  }
//connexion de l'utilisateur
 signInUser (email:string ,password:string){
   return new Promise<void>(
     (resolve,reject) => {
       firebase.auth().signInWithEmailAndPassword(email,password).then(
        () => {
          resolve();
        },
        (error) => {
          reject(error);
        }
       );
       
     }
   );
 }
 //l'utilisateur exit
signOutUser(){
  firebase.auth().signOut();
}
}
