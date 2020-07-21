import { BrowserModule } from '@angular/platform-browser';
import { NgModule, APP_INITIALIZER } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { MsalModule, MsalInterceptor, MsalService, MSAL_CONFIG } from '@azure/msal-angular';
import { AppComponent } from './app.component';
import { environment } from '../environments/environment';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenInterceptor } from './interceptor/TokenInterceptor';
import { HttpClientModule } from '@angular/common/http';
import { CoreModule, BaseConstants } from './core.module';
import { ConfigProvider } from './core.module/services';



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
    MsalModule.forRoot({
      auth: {
        clientId: environment.clientID,
        authority: environment.authority,
        redirectUri: environment.redirectUri,
        navigateToLoginRequestUrl: true
      },
      cache: {
        cacheLocation: 'localStorage'
      }
    },
        {
          popUp: false,
          consentScopes: [
            'openid']
          // protectedResourceMap:
          //   [['https://demofunctionappnitor.azurewebsites.net', ['api://1f34ca64-8587-4647-83f5-88fa457d6b41/rishu_demo']]]
        }
    )],
  bootstrap: [AppComponent],
  providers: [
    // MsalService,
    // {
    //   provide: MSAL_CONFIG,
    //   useValue: getConfig()
    // },
    // { provide: HTTP_INTERCEPTORS, useClass: htt, multi: true },
  ],
})
export class AppModule { }
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
