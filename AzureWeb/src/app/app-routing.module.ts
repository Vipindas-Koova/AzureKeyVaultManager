import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { MsalGuard } from '@azure/msal-angular';

const routes: Routes = [
  // { path: '**', redirectTo: 'dashboard', pathMatch: 'full' , canActivate : [MsalGuard] },
    { path: '**', component: AppComponent, canActivate : [MsalGuard] }
    // { path: 'id_token', component: AppComponent, canActivate : [MsalGuard] },
    // { path: 'access_token', component: AppComponent, canActivate : [MsalGuard] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
