import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ArchivesService } from '../archives/archives.service';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css']
})
export class LandingPageComponent implements OnInit {
  selectedOption = 'option1'; // Default selected option
  tableData: any[] = [];

  constructor(private http: HttpClient, private archivesService: ArchivesService ) {}

  ngOnInit(): void {
    
    // Fetch data for the default selected option when the component initializes
    this.fetchData(this.selectedOption);
  }

  fetchData(option: string): void {
    let apiUrl: string;

    switch (option) {
      case 'option1':
        apiUrl = 'http://localhost:8000/allreviews';
        break;
      case 'option2':
        apiUrl = 'http://localhost:8000/bettingapps';
        break;
      case 'option3':
        apiUrl = 'http://localhost:8000/loanapps';
        break;
      case 'option4':
        apiUrl = 'http://localhost:8000/mobilebanking';
        break;
      default:
        apiUrl = 'http://localhost:8000/allreviews'; // Default to 'All Reviews'
    }

    // Add the search query to the history
    this.archivesService.addSearchHistory(option);


    this.http.get(apiUrl).subscribe((data: any) => {
      // Sort the data by Positive_Review_Percentage in descending order
      this.tableData = data.sort((a: any, b: any) => b.Positive_Review_Percentage - a.Positive_Review_Percentage);
    });
  }

  onDropdownChange(event: any): void {
    this.selectedOption = event.target.value;
    // Initialize the archives service when an option is selected
    this.archivesService = new ArchivesService();
    // Fetch data for the selected option and sort it
    this.fetchData(this.selectedOption);
  }
}
