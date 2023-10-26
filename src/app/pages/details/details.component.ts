import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { Olympic } from 'src/app/core/models/Olympic';
import { Country } from 'src/app/core/models/Country';
import { OlympicService } from 'src/app/core/services/olympic.service';
import { ActivatedRoute } from '@angular/router';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})

export class DetailsComponent implements OnInit, OnDestroy{

  public olympicSubs!: Subscription;
  
  public country!: Country;

  public totalMedals!: number;

  public totalAthlete!: number;

  public countries : Country[] = [];

  constructor(private olympicService: OlympicService,
              private route: ActivatedRoute) {
                this.getScreenSize();
              }

  ngOnInit(): void {
    var listOlympics!: Olympic[];
    this.olympicSubs =  this.olympicService.getOlympics().subscribe(x => {
      listOlympics=x;
      this.olympicService.controlName(this.route.snapshot.params['name'], listOlympics);
      const countryName = this.route.snapshot.params['name'];
      this.country = this.olympicService.createStatistics(listOlympics, countryName);
      this.countries.push(this.country)
      this.totalAthlete = this.olympicService.getAthleteCount(countryName,listOlympics)
      this.totalMedals = this.olympicService.getMedalsCount(countryName,listOlympics)
    });
   
  }

  ngOnDestroy() : void{
    this.olympicSubs.unsubscribe();
  }

  scrHeight!:number;
  scrWidth!:number;

  @HostListener('window:resize')
    getScreenSize() {
          this.scrHeight = window.innerHeight;
          this.scrWidth = window.innerWidth;
    }


}
