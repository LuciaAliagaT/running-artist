import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpDataService } from 'src/app/services/http-data.service';
import { Offers } from 'src/app/models/offers.model';

@Component({
  selector: 'app-edit-offer',
  templateUrl: './edit-offer.component.html',
  styleUrls: ['./edit-offer.component.scss']
})
export class EditOfferComponent implements OnInit {
  offerData: Offers = {
    id: 0,
    title: '',
    description: '',
    points: 0,
    businessId: ''
  };

  constructor(private route: ActivatedRoute, private router: Router, private offersService: HttpDataService) {}

  ngOnInit() {
    const offerId = this.route.snapshot.paramMap.get('id');

    this.offersService.getOfferById(offerId).subscribe(
      (response: Offers) => {
        this.offerData = { ...response };
      },
      (error: any) => {
        console.error('Error fetching offer details:', error);
      }
    );
  }

  onSubmit(): void {
  
    this.offersService.updateOffer(this.offerData.id, this.offerData).subscribe(
      (response: Offers) => {
        this.router.navigate(['/business/offers']);
      },
      (error: any) => {
        console.error('Error updating offer:', error);
      }
    );  
    }

    cancelEdit(): void {
      this.router.navigate(['/business/offers']);
    }

}
