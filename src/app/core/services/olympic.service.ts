import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { catchError, count, tap } from 'rxjs/operators';
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

  /**
   * 
   * @param listOlympics 
   * @returns Liste de Country contenant le nom du Pays et son nombre de médaille remportées.
   */
  createPaysCount(listOlympics: Olympic[]): Array<Country> {
    let listPaysCount: Array<Country> = [];
    for (let i=0; i<listOlympics.length; i++){
      let count = 0;
      let pays = listOlympics[i].country;
      for (let j=0; j < listOlympics[i].participations.length ; j++){
        count+=listOlympics[i].participations[j].medalsCount;
      }
      let paysCount = {name: pays, value: count, series: []}
      listPaysCount.push(paysCount);
    }
    
    return listPaysCount;
  }

  /**
   * 
   * @param listOlympics 
   * @param nomPays 
   * @returns Un Country contenant le nombre de médaille gagné par années dans le series
   */
  createStatistics(listOlympics: Olympic[], nomPays : string): Country {
    let country : Country = {name: nomPays, value: 0, series: []};
    const olympic = listOlympics.find(olympic => olympic.country === nomPays);
    if (olympic!=undefined && country.series!=undefined){
      for (let i in olympic.participations){
        const year = olympic.participations[i].year;
        const medalsCount = olympic.participations[i].medalsCount;
        country.series.push({name: ""+year, value: medalsCount});
      }
    }
    console.log(country);
    return country;
  }
  
  /**
   * 
   * @param nomPays 
   * @param listOlympics 
   * @returns Le nombre d'athlete ayant participé à tous les JO
   */
  getAthleteCount(nomPays : string, listOlympics: Olympic[]) : number{
    const olympic = listOlympics.find(olympic => olympic.country === nomPays);
    let total = 0
    if (olympic!=undefined){
      for (let i in olympic.participations){
        total+=olympic.participations[i].athleteCount;
      }
    }
    return total
  }

  /**
   * 
   * @param nomPays 
   * @param listOlympics 
   * @returns Le nombre de médaille gagnées au cours de tous les JO
   */
  getMedalsCount(nomPays : string, listOlympics: Olympic[]) : number{
    const olympic = listOlympics.find(olympic => olympic.country === nomPays);
    let total = 0
    if (olympic!=undefined){
      for (let i in olympic.participations){
        total+=olympic.participations[i].medalsCount;
      }
    }
    return total
  }
  
}