import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Olympic } from 'src/app/core/models/Olympic';
import { Country } from 'src/app/core/models/Country';
import { OlympicService } from 'src/app/core/services/olympic.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  
  listOlympics!: Olympic[];

  public listPaysCount!: Array<Country>;

  constructor(private olympicService: OlympicService,
              private router: Router) {}

  ngOnInit(): void {
    this.olympicService.getOlympics().subscribe(x => {
      this.listOlympics=x;
      this.listPaysCount = this.olympicService.createPaysCount(this.listOlympics);
    });
  }

  goToCountry(event: any) : void{
    console.log();
    this.router.navigateByUrl(`pays/${event.name}`)
  }

}
