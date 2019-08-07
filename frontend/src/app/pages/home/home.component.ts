import { Component, OnInit } from '@angular/core';
import { PlayersService } from '../../services/players.service';
import { Player } from 'src/app/models/Player';
import { CookieService } from 'ngx-cookie-service';
import {MatDialog} from '@angular/material/dialog';
import * as moment from 'moment';
import * as webNotification from 'simple-web-notification';
import { interval, Subscription } from 'rxjs';
import { ReadyDialogComponent } from './ready-dialog/ready-dialog.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  activePlayers: Player[];
  thisPlayer: Player;

  userName: string; // from input
  userID: number; // after getting into queue
  waitTime: number; // minutes since queue join
  notificationPermissionGranted: boolean;

  activePlayersSubscription: Subscription;

  constructor(private playersService: PlayersService,
              private cookieService: CookieService,
              private dialog: MatDialog) { }

  ngOnInit() {
    this.askForNotificationPermission();
    this.checkForUserID();
    this.getActivePlayers();
    this.startActivePlayersSubscription();
  }

  ngOnDestroy() {
    this.activePlayersSubscription.unsubscribe();
  }

  private checkForUserID() {
    try {
      const cookie = this.cookieService.get('userID');
      if (cookie.length > 0) {
        this.userID = parseInt(cookie);
      }
    } catch (error) {
      console.log(error);
      this.userID = undefined;
    }
    
  }

  private async getActivePlayers() {
    try {
      this.activePlayers = await this.playersService.getActivePlayers(); 
      if (this.userID) {
        // user is in queue

        if (!this.thisPlayer) {
          this.thisPlayer = this.activePlayers.find(player => player.rowID === this.userID);
        }

        this.calculateWaitTime();

        if (this.activePlayers.length < 4) {
          return;          
        } 

        // 4 or more players waiting
        this.onLeaveQueueClick();
        if (this.notificationPermissionGranted) {
          this.showReadyNotification();
        } else {
          this.openReadyDialog();
        }
      }
    } catch (error) {
      console.log(error);
    } 
  }

  private startActivePlayersSubscription() {
    // every 5 seconds, check if there are new players active
    const source = interval(5000);
    this.activePlayersSubscription = source.subscribe(() => this.getActivePlayers());
  }

  private calculateWaitTime() {
    this.waitTime = moment().diff(this.thisPlayer.joinTime, 'minutes');
  }
  
  private askForNotificationPermission() {
    webNotification.requestPermission((granted: boolean) => {
      this.notificationPermissionGranted = granted;
    });
  }

  private showReadyNotification() {
    webNotification.showNotification('Ready', {
      body: 'Device A0 is ready!',
      onClick: () => { },
      autoClose: 0 //do not close the notificaion automatically
    }, function onShow(error, hide) {
      if (error) {
          window.alert('Unable to show notification: ' + error.message);
      }
    });
  }

  private openReadyDialog() {
    this.dialog.open(ReadyDialogComponent, {
      width: '250px'
    });
  }

  /*
  *
  * INPUT HANDLERS
  * 
  */

  onNameInput(value) {
    this.userName = value;
  }

  async onGetInQueueClick() {
    try {
      if (this.userName && this.userName.length > 0) {
        this.userID = await this.playersService.addPlayer(this.userName, this.userID);
        this.cookieService.set('userID', this.userID.toString());
        this.getActivePlayers();
      }
    } catch (error) {
      console.log(error);
    }
  }
  
  async onLeaveQueueClick() {
    try {
      await this.playersService.removePlayer(this.userID);
      this.cookieService.set('userID', '');
      this.userID = undefined;
      this.thisPlayer = undefined;
      this.getActivePlayers();
    } catch (error) {
      console.log(error);
    }
  }
}
