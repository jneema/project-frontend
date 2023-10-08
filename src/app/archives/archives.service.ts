import { Injectable } from '@angular/core';

interface SearchHistoryItem {
  query: string;
  date: Date;
  timestamp: number;
}

@Injectable({
  providedIn: 'root',
})
export class ArchivesService {
  private localStorageKey = 'searchHistory';
  private searchHistory: SearchHistoryItem[] = [];

  constructor() {
    // Load search history from localStorage when the service is created
    const storedHistory = localStorage.getItem(this.localStorageKey);
    if (storedHistory) {
      this.searchHistory = JSON.parse(storedHistory);
    }
  }

  addSearchHistory(query: string): void {
    const date = new Date(); // Capture the current date and time
    const timestamp = date.getTime(); // Capture the current timestamp (milliseconds since epoch)
    this.searchHistory.push({ query, date, timestamp });

    // Save the updated search history to localStorage
    localStorage.setItem(this.localStorageKey, JSON.stringify(this.searchHistory));
  }

  getSearchHistory(): SearchHistoryItem[] {
    const searchHistory = localStorage.getItem(this.localStorageKey);
    if (searchHistory) {
      return JSON.parse(searchHistory);
    }
    return [];
  }
}
