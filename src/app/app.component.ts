import { Component, HostListener, OnInit } from '@angular/core';
import { AuthService } from './services/auth/authentication/auth.service';
import { interval } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'Otomate';
  intervalSubscription: any;
  http: any;

 
  constructor(private auth:AuthService) {

  }
     ngOnInit(): void {
     }    
     @HostListener('contextmenu', ['$event'])
     onRightClick(event:MouseEvent) {
       event.preventDefault();
     }
              
}
