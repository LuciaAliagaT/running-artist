import { Component } from '@angular/core';
import { HttpDataService } from 'src/app/services/http-data.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  offersCount: number = 0;

  constructor(private HttpDataService: HttpDataService) { }

  ngOnInit(): void {
    this.getOffersCount();
  }
  
  getOffersCount(){
    this.HttpDataService.getList().subscribe((data: any) => {
      console.log(data);
      this.offersCount = data.length;
    })
  }

}
