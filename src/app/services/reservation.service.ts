import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { revers } from '../model/revers.model';
import * as firebase from 'firebase/app';
import 'firebase/database';
import snapshot = firebase.database.DataSnapshot;




@Injectable({
  providedIn: 'root'
})
//revers c'est le modele de reservation
export class ReservationService {

reservations:revers[] =[];
reservationsSubject=new Subject<revers[]>();
//ajouter la reservation
  constructor() {  }
  emitReservations(){
this.reservationsSubject.next(this.reservations);
  }
  // sauvgarder la reservation
  saveReservation(){
firebase.database().ref('/reservation').set(this.reservations);

  }
  //reprendre la reservation
  getReservations(){
    firebase.database().ref('/reservation')
    .on('value', (data: snapshot) => {
        this.reservations = data.val() ? data.val() : [];
        this.emitReservations();
      }
    );
  }
  //reprende une seul reservation
  getSingelReservation(id:number){
    return new Promise(
      (resolve, reject) => {
        firebase.database().ref('/reservation/' + id).once('value').then(
          (data: snapshot) => {
            resolve(data.val());
          }, (error) => {
            reject(error);
          }
        );
      }
    );
  }

  // la creation d'une nouvelle reservation
  createNewreservation(newrevers:revers){
    this.reservations.push(newrevers);
    this.saveReservation();
    this.emitReservations();
  }
  //supprime la reservation
  removeReservation(revers:revers){
    const reservationIndexToRemove = this.reservations.findIndex(
      (reversEl) => {
        if (reversEl === revers){
          return true;
        }
      }
    );
    this.reservations.splice(reservationIndexToRemove,1);
    this.saveReservation();
    this.emitReservations();
  }


}
