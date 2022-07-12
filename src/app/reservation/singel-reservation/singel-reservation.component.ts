import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { revers } from 'src/app/model/revers.model';
import { ReservationService } from 'src/app/services/reservation.service';



//affiche la liste des reservation, où chaque reservation peut être cliqué pour en voir 
//la page 'SingelReservationComponent'


@Component({
  selector: 'app-singel-reservation',
  templateUrl: './singel-reservation.component.html',
  styleUrls: ['./singel-reservation.component.scss']
})
export class SingelReservationComponent implements OnInit {

  reservation: revers;

  constructor(private route: ActivatedRoute, private reservationService: ReservationService,
    private router: Router
  ) {}

 
  ngOnInit() {
    var dateD = localStorage.getItem("dateDep");
    console.log("dateD",dateD);
    console.log(this.calculeDif());

    this.reservation = new revers('', '');
    const id = this.route.snapshot.params['id'];
    this.reservationService.getSingelReservation(+id).then(
      (reservation: revers) => {
        this.reservation = reservation;
      }
    );
    this.calculeDif()
  }
calculeDif(){
  var dateD = localStorage.getItem("dateDep");
  var dateR = localStorage.getItem("dateRout");

  const dt1 = new Date(dateD);
  const dt2 = new Date(dateR);

return Math.floor((Date.UTC(dt2.getFullYear(), dt2.getMonth(), dt2.getDate()) - Date.UTC(dt1.getFullYear(), dt1.getMonth(), dt1.getDate()) ) /(1000 * 60 * 60 * 24));

}
  onBack() {
    this.router.navigate(['/reservation']);
  }
}
