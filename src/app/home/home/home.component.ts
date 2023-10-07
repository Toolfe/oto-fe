import { trigger, state, style, transition, animate } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { GreetingComponent } from '../greeting/greeting.component';
import { HttpClient } from '@angular/common/http'; // Import HttpClient

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  animations: [
    trigger('rotatedState', [
      state('default', style({ transform: 'rotate(0)' })),
      state('rotated', style({ transform: 'rotate(-90deg)' })),
      transition('rotated => default', animate('400ms ease-out')),
      transition('default => rotated', animate('400ms ease-in'))
    ])]

})
export class HomeComponent implements OnInit {
  latitude: number | undefined;
  longitude: number | undefined;
  locationError: string | undefined;
  locationDetails: any;
  constructor(private dialog: MatDialog, private http: HttpClient) { }
  state: string = 'default';

  rotate() {
    this.state = (this.state === 'default' ? 'rotated' : 'default');
  }
  ngOnInit(): void {
    let initial = sessionStorage.getItem('initialLogin');
    if (initial == 'true') {
      this.dialog.open(GreetingComponent);
    }
  }

//   getLocation(): void {
//     if (navigator.geolocation) {
//       navigator.geolocation.getCurrentPosition(
//         (position) => {
//           this.latitude = position.coords.latitude;
//           this.longitude = position.coords.longitude;
//           this.locationError = undefined;

// // 
//           // const apiKey = 'pk.eadbb0110402854d74f6152e7f92686d';
//           // const apiUrl = `https://us1.locationiq.com/v1/reverse.php?key=${apiKey}&lat=${this.latitude}&lon=${this.longitude}&format=json`;
      
//           // this.http.get(apiUrl)
//           //   .subscribe((response: any) => {
//           //     this.locationDetails = response;
//           //   });


//           // Google
//           // const apiKey = 'AIzaSyDvbqP4u1o6sciE1vXqQrAntDpmQXwG7jw';
//           // const apiUrl = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${this.latitude},${this.longitude}&key=${apiKey}`;

//           // this.http.get(apiUrl)
//           //   .subscribe((response: any) => {
//           //     this.locationDetails = response.results[0];
//           //   });
//           // 
//         },
//         (error) => {
//           this.locationError = 'Error getting location: ' + error.message;
//         }
//       );
//     } else {
//       this.locationError = 'Geolocation is not supported by this browser.';
//     }
//   }

}
