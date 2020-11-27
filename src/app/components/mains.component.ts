import { Component, NgZone, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiKey } from '../models';
import { NewsDatabase } from '../news.database'

@Component({
  selector: 'app-mains',
  templateUrl: './mains.component.html',
  styleUrls: ['./mains.component.css']
})
export class MainsComponent implements OnInit {
  
  apiKey: ApiKey
  
  constructor(private router: Router, private ngZone: NgZone, private newsDB: NewsDatabase) { }
  
  ngOnInit(): void {
    this.setApiKey()
    console.log('API Key >>> ', this.apiKey)
    this.apiKey === null ? this.toSettings() : this.toRegion()
  }

  setApiKey() {
    this.newsDB.getApiKey()
      .then(data => {
        // console.info(data)
        this.apiKey = data[0].apiKey
        console.info('this.apiKey >> ', this.apiKey)
      })
  }
  
  toRegion() {
    this.ngZone.run(() => {
      this.router.navigate([ '/region' ])
    })
  }
  
  toSettings() {
    this.ngZone.run(() => {
      this.router.navigate([ '/settings' ])
    })
  }
}
