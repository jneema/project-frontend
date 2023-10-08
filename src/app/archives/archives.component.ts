import { Component, OnInit } from '@angular/core';
import { ArchivesService } from './archives.service';
@Component({
  selector: 'app-archives',
  templateUrl: './archives.component.html',
  styleUrls: ['./archives.component.css'],
})
export class ArchivesComponent implements OnInit {
  searchHistory: { query: string; date: Date, timestamp: number }[] = [];

  constructor(private archivesService: ArchivesService) {}

  ngOnInit(): void {
    // Fetch search history and results from the service
    this.searchHistory = this.archivesService.getSearchHistory();
  }
}
