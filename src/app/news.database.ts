import { Injectable } from '@angular/core';
import Dexie from 'dexie';
import { ApiKey, Country, Article } from './models'

@Injectable()
export class NewsDatabase extends Dexie {

  apiKeyStore: Dexie.Table<ApiKey, number>
  countriesStore: Dexie.Table<Country, number>
  newsStore: Dexie.Table<Article, number>

  constructor() {
    super('NewsDB')
    this.version(3).stores({
      apiKeyStore: '++keyId',
      countriesStore: '++keyId',
      newsStore: '++keyId'
    })
    this.apiKeyStore = this.table('apiKeyStore')
    this.countriesStore = this.table('countriesStore')
    this.newsStore = this.table('newsStore')
  }

  // API_KEY TABLE
  async getApiKey(): Promise<any> {
    return await this.apiKeyStore.toArray()
    // console.info('In news.database.ts >> ', r)
  }

  async addApiKey(key: ApiKey) {
    this.apiKeyStore.put(key)
  }

  // COUNTRIES TABLE
  async addCountries(countries) {
    this.countriesStore.put(countries)
  }

  async getCountries(): Promise<any> {
    return this.countriesStore.get(1)
  }

  // NEWS TABLE
  async addNews(news) {
    this.newsStore.put(news)
  }
}