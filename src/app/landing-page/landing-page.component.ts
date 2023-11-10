import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css']
})
export class LandingPageComponent {
  searchQuery: string = '';
  numReviews: number = 100; // Default number of reviews
  scrapingMessage: string = ''; // Message to display to the user
  positiveReviewPercentage: number | null = null; // Positive review percentage

  constructor(private http: HttpClient) {}

  startScraping() {
    const apiEndpoint = 'http://localhost:8000/scrape_reviews/'; // Update with your FastAPI endpoint URL

    const requestPayload = {
      query: this.searchQuery,
      numReviews: this.numReviews,
    };

    this.scrapingMessage = 'Scraping in progress...'; // Display a message to indicate the process has started

    this.http.post<any>(apiEndpoint, requestPayload).subscribe(
      (response: any) => {
        this.scrapingMessage = response.message;
        this.positiveReviewPercentage = response.positive_review_percentage; // Set the positive review percentage

        console.log('Scraping completed successfully');
      },
      (error) => {
        this.scrapingMessage = 'Error occurred during scraping';
        console.error('Error:', error);
      }
    );
  }
}
