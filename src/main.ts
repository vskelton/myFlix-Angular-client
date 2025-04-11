import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppComponent } from './app/app.component'; // Import your standalone root component
import { importProvidersFrom } from '@angular/core';
import { AppRoutingModule } from './app/app-routing.module';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { bootstrapApplication } from '@angular/platform-browser'; // Import the bootstrapApplication function

bootstrapApplication(AppComponent, { // Bootstrap your standalone AppComponent
  providers: [
    importProvidersFrom(BrowserModule, AppRoutingModule, HttpClientModule, BrowserAnimationsModule)
    // Add other providers as needed (e.g., services)
  ]
})
  .catch(err => console.error(err));
