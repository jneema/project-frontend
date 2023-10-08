import { Component } from '@angular/core';

export interface FeedbackModel {
  name: string;
  text: string;
  rating: number;
}


@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.css']
})
export class FeedbackComponent {
  
  feedback: FeedbackModel = {
    name: '',
    text: '',
    rating: 0,
  };

  submitFeedback() {
    // Handle form submission logic here
    console.log(this.feedback);
    // You can send the feedback data to your backend or perform other actions
  }
}
