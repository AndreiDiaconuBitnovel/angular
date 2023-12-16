import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { FirstPageComponent } from './first-page/first-page.component';
import { appRoutes } from './routing/routing';
import { RouterModule } from '@angular/router';
import { SecondPageComponent } from './second-page/second-page.component';
import { ThirdPageComponent } from './third-page/third-page.component';
import { NavbarComponent } from './navbar/navbar.component';
import { LoginModalComponent } from './login-modal/login-modal.component';
import { FormsModule } from '@angular/forms';
import { Component, ViewChild } from '@angular/core';
import {DEFAULT_TIMEOUT, InterceptorService} from './services/interceptor/interceptor.service';

@NgModule({
  declarations: [
    AppComponent,
    FirstPageComponent,
    SecondPageComponent,
    ThirdPageComponent,
    NavbarComponent,
    LoginModalComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes),
    FormsModule,
  ],
  providers: [
    { provide: DEFAULT_TIMEOUT, useValue: 3000 },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: InterceptorService,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
