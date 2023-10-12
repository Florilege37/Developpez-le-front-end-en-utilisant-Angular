import { Component, HostListener, OnInit } from '@angular/core';
import { Olympic } from 'src/app/core/models/Olympic';
import { Country } from 'src/app/core/models/Country';
import { OlympicService } from 'src/app/core/services/olympic.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})

export class DetailsComponent implements OnInit{
  
  listOlympics!: Olympic[];

  public country!: Country;

  public totalMedals!: number;

  public totalAthlete!: number;

  countries : Country[] = [];

  constructor(private olympicService: OlympicService,
              private route: ActivatedRoute) {
                this.getScreenSize();
              }

  ngOnInit(): void {
    this.olympicService.getOlympics().subscribe(x => {
      this.listOlympics=x;
      const countryName = this.route.snapshot.params['name'];
      this.country = this.olympicService.createStatistics(this.listOlympics, countryName);
      //console.log("EGGGTAA" + this.country.series?.length)
      this.countries.push(this.country)
      this.totalAthlete = this.olympicService.getAthleteCount(countryName,this.listOlympics)
      this.totalMedals = this.olympicService.getMedalsCount(countryName,this.listOlympics)
      console.log(this.countries)
    });
    
  }

  scrHeight:any;
  scrWidth:any;

  @HostListener('window:resize', ['$event'])
    getScreenSize(event?: any) {
          this.scrHeight = window.innerHeight;
          this.scrWidth = window.innerWidth;
          console.log(this.scrHeight, this.scrWidth);
    }


}
