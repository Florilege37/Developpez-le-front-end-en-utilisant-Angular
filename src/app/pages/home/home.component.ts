import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Olympic } from 'src/app/core/models/Olympic';
import { OlympicService } from 'src/app/core/services/olympic.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  public olympics$!: Observable<Olympic[]>;
  listOlympics!: Olympic[];

  constructor(private olympicService: OlympicService) {}

  ngOnInit(): void {
    //this.olympics$ = this.olympicService.getOlympics().subscribe(x => {this.test=x});
    this.olympicService.getOlympics().subscribe(x => {this.listOlympics=x});
  }

  


  
  /*public olympics$!: Observable<Olympic>;
  olympic!: Olympic;

  constructor(private olympicService: OlympicService) {}

  ngOnInit(): void {
    this.olympics$ = this.olympicService.getOlympics();
    this.showOlympics();
  }

  showOlympics() {
    this.olympicService.getOlympics()
    .subscribe((data: Olympic) => this.olympic = {
      ...data
    });
  }
  */
}
