import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { ReadyDialogComponent } from './pages/home/ready-dialog/ready-dialog.component';

import {MatDividerModule} from '@angular/material/divider';
import {MatListModule} from '@angular/material/list';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatCardModule} from '@angular/material/card';
import {MatDialogModule} from '@angular/material/dialog';
import { CookieService } from 'ngx-cookie-service';
import {MatIconModule} from '@angular/material/icon';
import { PlayersService } from './services/players.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatToolbarModule} from '@angular/material/toolbar';
import { HttpClientModule } from '@angular/common/http';

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
