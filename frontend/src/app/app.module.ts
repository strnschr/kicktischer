import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatToolbarModule} from '@angular/material/toolbar';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { PlayersService } from './services/players.service';
import { HttpClientModule } from '@angular/common/http';
import {MatDividerModule} from '@angular/material/divider';
import {MatListModule} from '@angular/material/list';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatCardModule} from '@angular/material/card';
import { CookieService } from 'ngx-cookie-service';
import {MatIconModule} from '@angular/material/icon';
import { ReadyDialogComponent } from './pages/home/ready-dialog/ready-dialog.component';
import {MatDialogModule} from '@angular/material/dialog';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ReadyDialogComponent
  ],
  imports: [
    BrowserModule,
    MatIconModule,
    HttpClientModule,
    MatToolbarModule,
    MatListModule,
    MatCardModule,
    MatFormFieldModule,
    MatDialogModule,
    MatButtonModule,    
    MatInputModule,
    MatDividerModule,
    AppRoutingModule,
    BrowserAnimationsModule,
  ],
  providers: [PlayersService, CookieService],
  bootstrap: [AppComponent],
  exports: [ReadyDialogComponent]
})
export class AppModule { }
