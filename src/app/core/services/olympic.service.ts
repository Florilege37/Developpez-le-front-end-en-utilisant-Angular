import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Olympic } from '../models/Olympic';
import { Country } from '../models/Country';

@Injectable({
  providedIn: 'root',
})
export class OlympicService {
  private olympicUrl = './assets/mock/olympic.json';
  private olympics$ = new BehaviorSubject<Olympic[]>({} as Olympic[]);

  constructor(private http: HttpClient) {}

  loadInitialData() {
    return this.http.get<Olympic[]>(this.olympicUrl).pipe(
      tap((value) => this.olympics$.next(value)),
      catchError((error, caught) => {
        // TODO: improve error handling
        console.error(error);
        // can be useful to end loading state and let the user know something went wrong
        //this.olympics$.next();
        return caught;
      })
    );
  }

  getOlympics() {
    return this.olympics$.asObservable();
  }

  createPaysCount(listOlympics: Olympic[]): Array<Country> {
    let listPaysCount: Array<Country> = [];
    for (let i=0; i<listOlympics.length; i++){
      let count = 0;
      let pays = listOlympics[i].country;
      for (let j=0; j < listOlympics[i].participations.length ; j++){
        count+=listOlympics[i].participations[j].medalsCount;
      }
      let paysCount = {name: pays, value: count}
      listPaysCount.push(paysCount);
    }
    
    return listPaysCount;
  }

  createStatistics(listOlympics: Olympic[], nomPays : string): Country {
    console.log("AHHHHHHHHHHHHHHHHHHH");
    let country !: Country;
    let olympic = listOlympics.find(olympic => olympic.country === nomPays);
    if (olympic!=undefined){
      for (let i=0; i < olympic.participations.length; i++){
        let year = olympic.participations[i].year;
        let medalsCount = olympic.participations[i].medalsCount;
        let statistics = {name: year, value: medalsCount};
        country.series?.push(statistics)
        console.log("Taille" + statistics);
      }
    }
    return country;
  }
  
}
