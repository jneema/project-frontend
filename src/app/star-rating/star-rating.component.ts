import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-star-rating',
  templateUrl: './star-rating.component.html',
  styleUrls: ['./star-rating.component.css']
})
export class StarRatingComponent {
  @Input() rating: number = 0; // Initialize the rating property with a default value
  @Output() ratingChange = new EventEmitter<number>();

  // Initialize the selectedRating property with a default value, such as 0
  selectedRating: number = 0;

  constructor() {}

  setRating(rating: number) {
    this.selectedRating = rating;
    this.ratingChange.emit(this.selectedRating);
  }
}
