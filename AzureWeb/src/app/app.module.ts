import { BrowserModule } from '@angular/platform-browser';
import { NgModule, APP_INITIALIZER } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { MsalModule, MsalInterceptor, MsalService, MSAL_CONFIG, MsalAngularConfiguration, MSAL_CONFIG_ANGULAR } from '@azure/msal-angular';
import { AppComponent } from './app.component';
import { environment } from '../environments/environment';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenInterceptor } from './interceptor/TokenInterceptor';
import { ConfigProvider } from './core.module/services';
import { HttpClientModule } from '@angular/common/http';
import { CoreModule, BaseConstants } from './core.module';
import { Configuration } from 'msal';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    ToastrModule.forRoot(),
    BrowserAnimationsModule,
    CoreModule.forRoot(),
    MsalModule],
  bootstrap: [AppComponent],
  providers: [ConfigProvider,
    { provide: APP_INITIALIZER, useFactory: appConfigServiceFactory, deps: [ConfigProvider], multi: true },
    {
      provide: MSAL_CONFIG,
      useFactory: msalConfigFactory,
      deps: [ConfigProvider]
  },
  {
    provide: MSAL_CONFIG_ANGULAR,
    useFactory: msalAngularConfigFactory,
    deps: [ConfigProvider]
},
MsalService
    // { provide: HTTP_INTERCEPTORS, useClass: htt, multi: true },
  ],
})
export class AppModule { }

export function appConfigServiceFactory(config: ConfigProvider): any {
  return () => config.load();
}

export function msalConfigFactory(config: ConfigProvider): Configuration {
  debugger;
  const auth = {
      auth: {
          clientId: config.getConfig('clientID'),
          authority: config.getConfig('authority'),
          redirectUri: config.getConfig('redirectUri')
      },
      cache: {
          cacheLocation: 'localStorage'
      }
  };
  return (auth as Configuration);
}
export function msalAngularConfigFactory(): MsalAngularConfiguration {
  const auth = {
      unprotectedResources: [],
      protectedResourceMap: [],
  };
  return (auth as MsalAngularConfiguration);
}

// export function getConfig() {
//   const obj = {
//     auth: {
//       clientId: BaseConstants.clientId,
//       authority: BaseConstants.authority,
//       redirectUri: BaseConstants.redirectUri,
//       navigateToLoginRequestUrl: true
//     },
//     cache: {
//       cacheLocation: 'localStorage'
//     }
//   };
//   return obj;
// }
