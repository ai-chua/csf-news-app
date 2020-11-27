import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { Router, RouterModule, Routes } from '@angular/router'
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { SettingsComponent } from './components/settings.component';
import { MainsComponent } from './components/mains.component';
import { RegionComponent } from './components/region.component';

import { NewsDatabase } from './news.database';
import { RegionNewsComponent } from './components/region-news.component'

const ROUTES: Routes = [
  { path: '', component: MainsComponent },
  { path: 'region', component: RegionComponent },
  { path: 'settings', component: SettingsComponent },
  { path: 'news/:region', component: RegionNewsComponent },
  { path: '**', redirectTo: '/', pathMatch: 'full' }
]

@NgModule({
  declarations: [
    AppComponent,
    SettingsComponent,
    MainsComponent,
    RegionComponent,
    RegionNewsComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(ROUTES),
    HttpClientModule
  ],
  providers: [ NewsDatabase ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
