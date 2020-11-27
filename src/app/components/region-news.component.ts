import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { ApiKey } from '../models'
import { NewsDatabase } from '../news.database'

@Component({
  selector: 'app-region-news',
  templateUrl: './region-news.component.html',
  styleUrls: ['./region-news.component.css']
})
export class RegionNewsComponent implements OnInit {

  region: string
  apiKey

  constructor(private router: Router, private activatedRoute: ActivatedRoute, private http: HttpClient, private newsDB: NewsDatabase) { }

  async ngOnInit(): Promise<void> {
    this.region = this.activatedRoute.snapshot.params['region']
    this.apiKey = await this.getApiKey()
    console.info(this.apiKey)
    this.getNews(this.region)
  }

  getNews(region) {
    const queryParams: HttpParams = new HttpParams().set("country", this.region).set("apiKey", this.apiKey)
    console.info(queryParams)
    this.http.get('https://newsapi.org/v2/top-headlines', { params: queryParams })
      .toPromise()
      .then(data => {
        // console.info(data.articles)
      })
  }

  getApiKey() {
    return this.newsDB.getApiKey().then(data => {
      // this.apiKey = data[0].apiKey
      // console.info(data[0].apiKey)
      return data[0].apiKey
    })
    // console.info(k)
  }

}
