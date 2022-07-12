import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { revers } from 'src/app/model/revers.model';
import { ReservationService } from 'src/app/services/reservation.service';

//la form ou la structure de reservation

@Component({
  selector: 'app-form-reservation',
  templateUrl: './form-reservation.component.html',
  styleUrls: ['./form-reservation.component.scss']
})
export class FormReservationComponent implements OnInit {

  reservationForm: FormGroup;
calculedate:revers;
  constructor(private formBuilder: FormBuilder, private reservationService: ReservationService,
              private router: Router) { }
              
  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.reservationForm = this.formBuilder.group({
      position: ['', Validators.required],
      voiture: ['', Validators.required],
      datee: '',
      dates: ''
    });
 
   
   }
  onSaveReservation() {
    console.log('FormGroup', this.reservationForm);
    const position = this.reservationForm.get('position').value;
    const voiture = this.reservationForm.get('voiture').value;
    const datee = this.reservationForm.get('datee').value;
    const dates = this.reservationForm.get('dates').value;

    localStorage.setItem("dateDep",datee);
    localStorage.setItem("dateRout",dates);
    
    const newReservation = new revers(position, voiture);
    newReservation.datee = datee;
    newReservation.dates = dates;
    this.reservationService.createNewreservation(newReservation);
    this.router.navigate(['/reservation']);
    
  }

}
