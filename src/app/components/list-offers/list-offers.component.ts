import { Component, ViewChild } from '@angular/core';
import { Offers } from 'src/app/models/offers.model';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { HttpDataService } from 'src/app/services/http-data.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-list-offers',
  templateUrl: './list-offers.component.html',
  styleUrls: ['./list-offers.component.scss']
})
export class ListOffersComponent {

  isShowCard = false;
  offerData !: Offers;
  offers: Offers[] = [];
  displayedColumns = ['id', 'title', 'description', 'points', 'businessId', 'actions' ]
  dataSource = new MatTableDataSource();
  
  @ViewChild('offerForm', {static: false})
  offerForm!: NgForm;

  @ViewChild(MatPaginator, {static: true}) 
    paginator!: MatPaginator;
    isEditMode = false;
  @ViewChild(MatSort, {static: true})
    sort!: MatSort;


  constructor(private offerService: HttpDataService, private router: Router) { 
    this.offerData = {} as Offers;
  }
  ngOnInit(){
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.getAllMovies();
    console.log("skdnfkldfn");
  } 
  getAllMovies(){
    this.offerService.getList().subscribe((response: any) => {
      this.dataSource.data = response;
    })
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }


  showCard(){

  }

  cancelEdit(): void {
    this.isEditMode = false;
    this.isShowCard = false;
    this.offerData = {} as Offers; 
    this.offerForm.reset(); 
  }

  cancelAdd(): void {
    this.isShowCard = false;
  }

  
  editOffer(element: any){

  }

  deleteOffer(id:any): void{
    this.offerService.getList().subscribe((response: any) => {
      this.dataSource.data = response;
    })
  }

  getRow( row:any ){
    this.router.navigateByUrl(`/detail/${row.id}`);
  }

  scrollToTop() {
    window.scroll({ top: 0, left: 0, behavior: 'smooth' });
  }

}
