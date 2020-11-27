import { Component, NgZone, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule, FormArray, FormBuilder, FormControl, Validators, FormGroup } from '@angular/forms'
import { Router } from '@angular/router';
import { NewsDatabase } from '../news.database'
import { ApiKey } from '../models'

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {
  
  apiForm: FormGroup
  apiKeyResult: []
  currentApiKey
  
  constructor(private fb: FormBuilder, private router: Router, private ngZone: NgZone, private newsDB: NewsDatabase) { }
  
  ngOnInit(): void {
     //@ts-ignore
    this.apiKeyResult = this.newsDB.getApiKey().then(data => {
      console.info(data)
      return data
    })
    console.info(this.apiKeyResult)
    if (this.apiKeyResult.length == 0) {
      console.log('No result')
      this.apiForm = this.fb.group({
        apiKey: this.fb.control('', [ Validators.required ] )
      })
    } else {
      console.log('Result: ', this.apiKeyResult.length)
      this.apiForm = this.fb.group({
        apiKey: this.fb.control('', [ Validators.required ] )
      })
    }
  }
  
  async saveApiKey() {
    const key: ApiKey = {
      apiKey: this.apiForm.value.apiKey
    }
    // console.info('Retrieved key from user input: ', key)
    // Assume user input is valid
    const res = await this.newsDB.addApiKey(key)
    console.info('Stored', key, 'to IndexedDB')
    this.router.navigate(['/region'])
  }
  
  toRegion() {
    this.apiForm.reset()
    this.ngZone.run(() => {
      this.router.navigate([ '/region' ])
    })
  }
  
  // Creating a FormGroup on init
  private createApiKeyForm() {
    return this.fb.group({
      apiKey: this.fb.control('', [ Validators.required ] )
    })
  }
}
