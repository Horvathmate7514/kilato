import { Component } from '@angular/core';
import { HttpService } from '../http.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

  locations: any[] = [];
  locationName: string = '';
  constructor(private http: HttpService, private router: Router) { }

  ngOnInit(){
    this.http.getLocations().subscribe({
      next: (result: any) => {
        this.locations = result;
      },
      error: (err) => {
        console.log(err);
      }
    })


  }
  selectLocation(){
    this.locations = [];
    this.http.getLocationByName(this.locationName).subscribe({
      next:(result) =>{
        this.locations = result;
      },
      error: (err) => {
        console.log(err);
      }
    })
  }
}
