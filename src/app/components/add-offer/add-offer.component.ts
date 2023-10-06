import { Component, ViewChild } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Offers } from 'src/app/models/offers.model';
import { HttpDataService } from 'src/app/services/http-data.service';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-offer',
  templateUrl: './add-offer.component.html',
  styleUrls: ['./add-offer.component.scss']
})
export class AddOfferComponent {
  title = new FormControl(null, [Validators.required, Validators.maxLength(60)]);
  description = new FormControl('');
  points = new FormControl(null, [Validators.required, Validators.max(100)]);
  businessId = new FormControl('');

  offerData!: Offers;
  
  @ViewChild('offerForm', {static: false})
  offerForm!: NgForm;

  constructor(private offersService:HttpDataService, private router: Router){ 
    this.offerData = {} as Offers;
  }

  getErrorMessage() {
    if (this.title.hasError('required') || this.points.hasError('required')) {
      return 'Este campo es obligatorio';
    }

    if (this.title.hasError('maxLength')) {
      return 'El título no puede tener más de 60 caracteres';
    }

    if (this.points.hasError('max')) {
      return 'Los puntos no deben exceder 100';
    }
    
    return '';
  }

  onSubmit(){
    this.addOffer()
  }

  addOffer(){
    this.offerData.id = 0;
    this.offersService.createOffer(this.offerData).subscribe((response: any) => {
        console.log(response);
    })
    this.router.navigateByUrl(`/business/offers`);
  }
  cancelAdd(){
    this.router.navigateByUrl(`/business/offers`);
  }
  
}
