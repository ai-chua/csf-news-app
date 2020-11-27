export interface ApiKey {
  apiKey: string;
  keyId?: number
}

export interface ApiForm {
  apiKey: string
}

export interface Country {
  country;
  keyId?: number
}

export class Article {
  article;
  region: Country;
  saved: boolean = false;
  keyId?: number
}