import { Component, OnInit } from '@angular/core';
import { ArchivesService } from './archives.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-archives',
  templateUrl: './archives.component.html',
  styleUrls: ['./archives.component.css'],
})
export class ArchivesComponent implements OnInit {
  searchHistory: { query: string; date: Date, timestamp: number }[] = [];

  constructor(private archivesService: ArchivesService,
    private route: ActivatedRoute
    ) {}

  ngOnInit(): void {
    // Fetch search history and results from the service
    this.searchHistory = this.archivesService.getSearchHistory();
  

  // Check if the default option was selected in the landing page
  this.route.queryParams.subscribe((params) => {
    if (params['defaultSelected'] === 'true') {
      // Add the default option to the search history
      this.addDefaultOptionToHistory();
    }
  });
}

private addDefaultOptionToHistory(): void {
  // You can customize the query and timestamp as needed
  const defaultOptionQuery = 'All Reviews';
  const defaultOptionTimestamp = Date.now();
  this.searchHistory.push({
    query: defaultOptionQuery,
    date: new Date(defaultOptionTimestamp),
    timestamp: defaultOptionTimestamp,
  });
}
// Check if archives have been cleared
archivesCleared = this.archivesService.areArchivesCleared();



clearArchives(): void {
  this.archivesService.clearArchives();
  // Clear the searchHistory array in the component if needed
  this.searchHistory = [];
}
}
