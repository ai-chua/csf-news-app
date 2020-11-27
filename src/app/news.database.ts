import { Injectable } from '@angular/core';
import Dexie from 'dexie';
import { ApiKey, Country } from './models'

@Injectable()
export class NewsDatabase extends Dexie {

  apiKeyStore: Dexie.Table<ApiKey, number>
  countriesStore: Dexie.Table<Country, number>

  constructor() {
    super('NewsDB')
    this.version(2).stores({
      apiKeyStore: '++keyId',
      countriesStore: '++keyId'
    })
    this.apiKeyStore = this.table('apiKeyStore')
    this.countriesStore = this.table('countriesStore')
  }

  // API_KEY TABLE
  async getApiKey(): Promise<any> {
    return this.apiKeyStore.toArray()
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
}