import { NgModule, ModuleWithProviders, Optional, SkipSelf, APP_INITIALIZER } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ToastrModule } from 'ngx-toastr';

import { ConfigProvider } from './services';


@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    HttpClientModule,
    NgbModule,
    ToastrModule.forRoot()
  ],
  declarations: [],
  exports: [CommonModule, NgbModule]
})
export class CoreModule {
  constructor(@Optional() @SkipSelf() core: CoreModule) {
    if (core) {
      console.log('Core module is already loaded');
      throw new Error('Core module is already loaded');
    }
  }
  public static forRoot(): ModuleWithProviders {
    return {
      ngModule: CoreModule,
      providers: [ConfigProvider,
        { provide: APP_INITIALIZER, useFactory: appConfigServiceFactory, deps: [ConfigProvider], multi: true }
      ]
    };
  }
}

export function appConfigServiceFactory(config: ConfigProvider): any {
  return () => config.load();
}

export { BaseConstants } from './constants';
