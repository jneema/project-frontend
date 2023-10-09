import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.css']
})
export class FeedbackComponent implements OnInit {
  feedback = {
    name: '',
    text: '',
    rating: null as number | null, // Initialize rating as null
  };

  selectedRating: number | null = null; // Initialize selectedRating as null

  reviews: any[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.fetchReviews();
  }

  submitFeedback() {
    if (this.feedback.rating === null) {
      // Provide feedback to the user that they need to select a rating
      // You can display an error message or prevent form submission
      return;
    }
  
    // Send feedback data to the API
    this.http.post('http://localhost:8000/feedback', this.feedback)
      .subscribe(
        (response) => {
          console.log('Feedback submitted successfully:', response);
          // Reset the form or provide feedback to the user
          // Reload the page
          window.location.reload();
        },
        (error) => {
          console.error('Error submitting feedback:', error);
          // Handle error and provide feedback to the user
        }
      );
  }
  

  fetchReviews() {
    const apiUrl = 'http://localhost:8000/allfeedback';

    this.http.get<any[]>(apiUrl).subscribe(
      (data) => {
        this.reviews = data;
      },
      (error) => {
        console.error('Error fetching reviews:', error);
        // Handle error and provide feedback to the user
      }
    );
  }
  // Function to set the selected rating
  // Function to set the selected rating
setRating(rating: number) {
  this.selectedRating = rating;
  this.feedback.rating = rating; // Update feedback.rating with the selected rating
}

 
}
