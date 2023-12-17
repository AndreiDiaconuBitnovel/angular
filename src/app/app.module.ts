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
import { CameraComponent } from './camera/camera.component';
import {WebcamModule} from 'ngx-webcam';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ItemModalComponent } from './item-modal/item-modal.component';
import { MatDialogModule } from '@angular/material/dialog';
import {NgxSpinnerModule} from 'ngx-spinner';

@NgModule({
  declarations: [
    AppComponent,
    FirstPageComponent,
    SecondPageComponent,
    ThirdPageComponent,
    NavbarComponent,
    LoginModalComponent,
    CameraComponent,
    ItemModalComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes),
    FormsModule,
    WebcamModule,
    BrowserAnimationsModule,
    MatDialogModule,
    NgxSpinnerModule
  ],
  providers: [
    { provide: DEFAULT_TIMEOUT, useValue: 30000 },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: InterceptorService,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
