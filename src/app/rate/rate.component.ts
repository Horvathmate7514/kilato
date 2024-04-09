import { Component } from '@angular/core';
import { HttpService } from '../http.service';
import { Router } from '@angular/router';
import { RateModel } from '../rate-model';

@Component({
  selector: 'app-rate',
  templateUrl: './rate.component.html',
  styleUrl: './rate.component.css'
})
export class RateComponent {
kilatok: any[] = [];
model: RateModel = {
  viewpointId: 0,
  email: '',
  rating: 0,
  comment: ''
}
errorMessage= ''

constructor(private http: HttpService, private router: Router) { }

ngOnInit(){
  this.http.getKilato().subscribe({
    next: (result: any) => {
      this.kilatok = result;
    },
    error: (err) => {
      console.log(err);
    }
  })

}
sendRate(){
if (!this.model.viewpointId) {
  this.errorMessage = 'Kérem válasszon kilátót'
  return;
}
if (!this.model.email) {
  this.errorMessage = 'Kérem írja be az email címet'
  return;
}
if (!this.model.rating) {
  this.errorMessage = 'Kérem válasszon egy értékelést'
  return;
}
if (!this.model.comment) {
  this.errorMessage = 'Kérem írjon be egy megjegyzést'
  return;
}
this.model.viewpointId = Number(this.model.viewpointId)
this.http.sendRate(this.model).subscribe({
  next:(result:any)=>{
    alert(`Sikeres értékelés! Eddigi értékelések száma${result.count} Átlagosan ${result.average} pontot ért el`)
  this.router.navigate(['/'])
  },
  error:(err: any)=>{
    this.errorMessage = err.error?? err.message
  }

})
}
}
