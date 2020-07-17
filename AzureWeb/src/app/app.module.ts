import { BrowserModule } from '@angular/platform-browser';
import { NgModule, APP_INITIALIZER } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { MsalModule } from '@azure/msal-angular';
import { AppComponent } from './app.component';
import { environment } from '../environments/environment';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenInterceptor } from './interceptor/TokenInterceptor';
import { HttpClientModule } from '@angular/common/http';
import { CoreModule } from './core.module';
import { ConfigProvider } from './core.module/services';



@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    MsalModule.forRoot({
      clientID: environment.clientID,
      authority: environment.authority,
      redirectUri: environment.redirectUri,
      cacheLocation: 'sessionStorage',
      validateAuthority: true,
      navigateToLoginRequestUrl: true,
    }),
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    ToastrModule.forRoot(),
    BrowserAnimationsModule,
    CoreModule.forRoot()
  ],
  bootstrap: [AppComponent],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true },
  ],
})
export class AppModule { }

export function appConfigServiceFactory(config: ConfigProvider): any {
  return () => config.load();
}