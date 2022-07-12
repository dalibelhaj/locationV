import { Component, OnDestroy, OnInit } from '@angular/core';
import { revers } from '../model/revers.model';
import { Subscription } from 'rxjs/Subscription';
import { ReservationService } from '../services/reservation.service';
import { Router } from '@angular/router';

//gerer la liste de reservation

@Component({
  selector: 'app-reservation',
  templateUrl: './reservation.component.html',
  styleUrls: ['./reservation.component.scss']
})
export class ReservationComponent implements OnInit,OnDestroy {

  reservations:revers[];
  reservationSubscription: Subscription;

  constructor(private ReservationService: ReservationService, private router: Router) {}
//l'action pour souscrire la subject de reservation 
  ngOnInit() {
    this.reservationSubscription = this.ReservationService.reservationsSubject.subscribe(
      (reservations:revers[]) => {
        this.reservations = reservations;
      }
    );
    this.ReservationService.getReservations();
    this.ReservationService.emitReservations();
  }
// les methode qui réagissent au evenement venant du dom
//le boutton pour la creation de nouvau reservation
onNewReservation() {
    this.router.navigate(['/reservation', 'new']);
  }
//le boutton pour la suppression de nouvau reservation
  onDeleteReservation(reservation: revers) {
    this.ReservationService.removeReservation(reservation);
  }
//le boutton pour afficher les reservation
  onViewReservation(id: number) {
    this.router.navigate(['/reservation', 'view', id]);
  }
  
  ngOnDestroy() {
    this. reservationSubscription.unsubscribe();
  }
}
