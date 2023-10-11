import { HttpClientModule } from '@angular/common/http';
import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { HeaderComponent } from './pages/header/header.component';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DetailsComponent } from './pages/details/details.component';

@NgModule({
  declarations: [AppComponent, HomeComponent, NotFoundComponent, HeaderComponent, DetailsComponent],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule, NgxChartsModule, BrowserAnimationsModule],
  providers: [
],
  bootstrap: [AppComponent],
})
export class AppModule {}
