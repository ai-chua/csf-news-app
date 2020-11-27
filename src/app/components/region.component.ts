import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { NewsDatabase } from '../news.database'
import { Router } from '@angular/router';

@Component({
  selector: 'app-region',
  templateUrl: './region.component.html',
  styleUrls: ['./region.component.css']
})
export class RegionComponent implements OnInit {

  countryShortName = 'ae;ar;at;au;be;bg;br;ca;ch;cn;co;cu;cz;de;eg;fr;gb;gr;hk;hu;id;ie;il;in;it;jp;kr;lt;lv;ma;mx;my;ng;nl;no;nz;ph;pl;pt;ro;rs;ru;sa;se;sg;si;sk;th;tr;tw;ua;us;ve;za'
  countries: []

  constructor(private http: HttpClient, private newsDB: NewsDatabase) { }

  ngOnInit(): void {
    // 1. CHECK NEWSDB FOR CACHE
    // this.retrieveCountriesFromDB()
    // if (this.countries.length === 0) {
      this.getCountries()
    // }
  }

  retrieveCountriesFromDB() {
    const res = this.newsDB.getCountries().then(data => {
      data.pop()
      console.info(data)
      return data
    })
    //@ts-ignore
    this.countries = res
  }

  getCountries() {
    const queryParams: HttpParams = new HttpParams().set("codes", this.countryShortName)
    this.http.get('https://restcountries.eu/rest/v2/alpha', { params: queryParams})
      .toPromise()
      .then(data => {
        //@ts-ignore
        this.countries = data
        this.newsDB.addCountries(data)
        console.info('Added to DB >> ', data)
      })
      .catch(err => console.info('Failed to fetch countries from restcountries api >> ', err))
  }

}
