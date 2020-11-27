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

export class article {
  article;
  saved: boolean = false
}