import { Component, OnInit } from '@angular/core';
import { TaskService } from '../../dashboard/task/service/task-service.service';
import { InfoComponent } from '../info/info.component'
import { interval } from 'rxjs';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';

export interface TimeSpan {
  hours: number;
  minutes: number;
  seconds: number;
}

@Component({
  selector: 'app-checkin-timer',
  templateUrl: './checkin-timer.component.html',
  styleUrls: ['./checkin-timer.component.scss'],
})

export class CheckInTimerComponent implements OnInit {
  d: Date | undefined;
  nd: Date | undefined;
  totalSeconds = 0;
  break: boolean = false;
  breakStop: boolean = false;
  checkInDuration!: string;
  constructor(private service: TaskService,
    private dialog: MatDialog,) {
  }


  ngOnInit(): void {
    interval(1000).subscribe(() => { });
    this.getUserCheckInList();
  }


  timeINStart() {

    let tym: string = this.checkInDuration;
    let tymvalue = [];
    tymvalue = tym.split(":")
    let hours = +tymvalue[0];
    let minutes = +tymvalue[1];
    let seconds = +tymvalue[2];
    this.d = new Date();
    this.d.setHours(this.d.getHours() - hours);
    this.d.setMinutes(this.d.getMinutes() - minutes);
    this.d.setSeconds(this.d.getSeconds() - seconds);
    let entry = this.d;
    this.getElapsedTime(this.d);
  }


  getElapsedTime(entry: any): TimeSpan {

    if (this.checkInDuration) {
      let tym: string = this.checkInDuration;
      let tymvalue = [];
      tymvalue = tym.split(":")
      let hours = +tymvalue[0];
      let minutes = +tymvalue[1];
      let seconds = +tymvalue[2];

      this.totalSeconds = Math.floor((new Date().getTime() - entry.getTime()) / 1000);

      if (this.totalSeconds >= 3600) {
        hours = Math.floor(this.totalSeconds / 3600);
        this.totalSeconds -= 3600 * hours;
      }

      if (this.totalSeconds >= 60) {
        minutes = Math.floor(this.totalSeconds / 60);
        this.totalSeconds -= 60 * minutes;
      }

      seconds = this.totalSeconds;

      return {
        hours: hours,
        minutes: minutes,
        seconds: seconds
      };
    } else {
      this.nd = new Date();
      let totalSeconds = Math.floor((new Date().getTime() - this.nd.getTime()) / 1000);

      let hours = 0
      let minutes = 0
      let seconds = 0

      if (totalSeconds >= 3600) {
        hours = Math.floor(totalSeconds / 3600);
        totalSeconds -= 3600 * hours;
      }
      if (totalSeconds >= 60) {
        minutes = Math.floor(totalSeconds / 60);
        totalSeconds -= 60 * minutes;
      }
      seconds = totalSeconds;

      return {
        hours: hours,
        minutes: minutes,
        seconds: seconds
      };
    }
  }

  onCheckInOut(status: number) {

    this.service.updateCheckInTime(status).subscribe(res => {
      if (res.success == true) {
        this.getUserCheckInList();
        // this.getAlertData(status);
        if (status === 1) {
          this.break = false;
          this.breakStop = true;
        } else if (status === 0) {
          this.break = true;
          this.breakStop = false;
        }
      }
    })

  }

  getUserCheckInList() {
    this.service.getUserCheckInList().subscribe(res => {
      if (res.success == true) {
        this.checkInDuration = res.data[0].checkInDuration;
        if (this.checkInDuration) {
          this.break = false;
          this.breakStop = true;
        }
        this.timeINStart()
      } else {
        this.checkInDuration = '';
        this.break = true;
        this.breakStop = false;
      }
    })
  }

  getAlertData(status: number) {
    this.service.getAlertData(status).subscribe(res => {
      if (res.data[0]) {
        const dialogConfig = new MatDialogConfig();
        dialogConfig.data = res.data[0];
        dialogConfig.width = '500px';
        let update = this.dialog.open(InfoComponent, dialogConfig);
        update.afterClosed().subscribe(res => {

        })
      }
      // if (res.success == true) {
      //   this.checkInDuration = res.data[0].checkInDuration;
      //   if (this.checkInDuration) {
      //     this.break = false;
      //     this.breakStop = true;
      //   }
      //   this.timeINStart()
      // } else {
      //   this.checkInDuration = '';
      //   this.break = true;
      //   this.breakStop = false;
      // }
    })
  }
}
