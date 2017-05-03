import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { SectionComponent } from './section.component';

@NgModule({
  imports: [BrowserModule],
  declarations: [
    AppComponent,
    SectionComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
