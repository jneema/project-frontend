import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { ArchivesComponent } from './archives/archives.component';
import { FeedbackComponent } from './feedback/feedback.component';
import { NavbarComponent } from './navbar/navbar.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { StarRatingModule } from 'angular-star-rating';
import { StarRatingComponent } from './star-rating/star-rating.component';
import { ArchivesService } from './archives.service';


@NgModule({
  declarations: [
    AppComponent,
    LandingPageComponent,
    ArchivesComponent,
    FeedbackComponent,
    NavbarComponent,
    StarRatingComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    StarRatingModule.forRoot()

  ],
  providers: [ArchivesService],
  bootstrap: [AppComponent]
})
export class AppModule { }
