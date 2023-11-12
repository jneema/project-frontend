import { Component, OnInit, AfterViewInit, OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';

declare var $: any;

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css']
})
export class LandingPageComponent implements OnInit, AfterViewInit, OnDestroy {
  searchQuery: string = '';
  numReviews: number = 100;
  scrapingMessage: string = '';
  positiveReviewPercentage: number | null = null;
  tableName: string | null = null;
  tableData: any[] | null = null;
  isTableVisible: boolean = false;

  constructor(private http: HttpClient) {}

  ngOnInit() {
    // Load DataTables scripts here
    $.getScript('https://code.jquery.com/jquery-3.6.4.min.js')
      .done(() => {
        console.log('jQuery script loaded successfully');
        $.getScript('https://cdn.datatables.net/1.11.3/js/jquery.dataTables.js')
          .done(() => {
            console.log('DataTables script loaded successfully');
          })
          .fail((error: any) => {
            console.error('Error loading DataTables script:', error);
          });
      })
      .fail((error: any) => {
        console.error('Error loading jQuery script:', error);
      });
  }

  startScraping() {
    const apiEndpoint = 'http://localhost:8000/scrape_reviews/';

    const requestPayload = {
      query: this.searchQuery,
      numReviews: this.numReviews,
    };

    this.scrapingMessage = 'Scraping in progress...';

    this.http.post<any>(apiEndpoint, requestPayload).subscribe(
      (response: any) => {
        this.scrapingMessage = response.message;
        this.positiveReviewPercentage = response.positive_review_percentage;
        console.log('Scraping completed successfully');
      },
      (error) => {
        this.scrapingMessage = 'Error occurred during scraping';
        console.error('Error:', error);
      }
    );
  }

  getLatestTableData() {
    const apiendpoint = 'http://localhost:8000/get_latest_table_data/';

    this.http.get<any>(apiendpoint).subscribe(
      (response: any) => {
        const tableName = response.table_name;
        const tableData = response.table_data;

        console.log(`Latest Table Name: ${tableName}`);
        console.log('Latest Table Data:', tableData);

        this.tableName = tableName;
        this.tableData = tableData;

        // Toggle table visibility
        this.toggleTableVisibility();
      },
      (error) => {
        console.error('Error:', error);
      }
    );
  }

  toggleTableVisibility() {
    this.isTableVisible = !this.isTableVisible;

    // If the table is visible, initialize DataTables; otherwise, destroy DataTables
    if (this.isTableVisible) {
      // Use setTimeout to ensure the view is updated before DataTables initialization
      setTimeout(() => {
        this.initializeDataTables();
      });
    } else {
      // Destroy DataTables
      const dataTable = $('#dataTable').DataTable();
      if (dataTable) {
        dataTable.destroy();
      }
    }
  }

  ngAfterViewInit() {
    // Initialize DataTables after the view is initialized
    this.initializeDataTables();
  }

  ngOnDestroy() {
    // Destroy DataTables when the component is destroyed
    this.destroyDataTables();
  }

  private initializeDataTables() {
    if (this.isTableVisible) {
      $('#dataTable').DataTable();
    }
  }

  private destroyDataTables() {
    const table = $('#dataTable').DataTable();
    if (table) {
      table.destroy();
    }
  }
}
