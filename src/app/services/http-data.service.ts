import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { catchError, Observable, retry, throwError } from 'rxjs';
import { Offers } from '../models/offers.model';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class HttpDataService {
  baseUrl: string = environment.baseURL;
  constructor(private http: HttpClient) { }

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  handlerError(error: HttpErrorResponse){
    if(error.error instanceof ErrorEvent){
      console.log(`An errorr ocurred ${error.status}, body was ${error.error}`);
    } else{
      console.log(`Backend returned code ${error.status}, body was ${error.error}`);
    }
    return throwError('Something happened with request, please try again later');

  }

  //Offer Crud
  getList(): Observable<Offers[]>{
    return this.http.get<Offers[]>(`${this.baseUrl}`)
    .pipe(retry(2), catchError(this.handlerError))
  }
  //OFFER  -> GET
  getOffer(id: string): Observable<Offers>{
    return this.http.get<Offers>(`${this.baseUrl}/${id}`)
    .pipe(retry(2), catchError(this.handlerError))
  }
  //CREATE → POST
  createOffer(item: any): Observable<Offers>{
    return this.http.post<Offers>(`${this.baseUrl}`, JSON.stringify(item), this.httpOptions)
    .pipe(retry(2), catchError(this.handlerError));
  }
  //DELETE → DELETE
  deleteOffer(id: string): Observable<Offers>{
    return this.http.delete<Offers>(`${this.baseUrl}/${id}`, this.httpOptions)
    .pipe(retry(2), catchError(this.handlerError))
  }
  //UPDATE → DELETE

  updateMovie(id: string, item: any): Observable<Offers>{
    return this.http.put<Offers>(this.baseUrl + '/' + id, JSON.stringify(item), this.httpOptions)
    .pipe(retry(2), catchError(this.handlerError));
  }


}
