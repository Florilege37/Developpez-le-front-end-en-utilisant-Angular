import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription, of } from 'rxjs';
import { Olympic } from 'src/app/core/models/Olympic';
import { Country } from 'src/app/core/models/Country';
import { OlympicService } from 'src/app/core/services/olympic.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit, OnDestroy {

  public olympicSubs!: Subscription;
  
  public listOlympics!: Olympic[];

  public listPaysCount!: Array<Country>;

  constructor(private olympicService: OlympicService,
              private router: Router) {}

  ngOnInit(): void {
    this.olympicSubs = this.olympicService.getOlympics().subscribe(x => {
                       this.listOlympics=x;
                       this.listPaysCount = this.olympicService.createPaysCount(this.listOlympics);
    });
    
  }

  ngOnDestroy(): void {
    this.olympicSubs.unsubscribe();
  }

  goToCountry(event: Country) : void{
    this.router.navigateByUrl(`pays/${event.name}`)
  }

}
