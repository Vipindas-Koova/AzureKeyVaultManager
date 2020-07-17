import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpHeaders } from '@angular/common/http';
import { IAzureKeyManager, IDataList } from '../model';
import { Observable } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { AppConstants } from '../constants/app-constants';
import { BaseConstants } from '../core.module';


@Injectable({
  providedIn: 'root'
})
export class AppService {

  constructor(private http: HttpClient, private toastrService: ToastrService) { }


  exportSecrets(exportKeysReq: IAzureKeyManager): Observable<IDataList[]> {
    return this.http.post<IDataList[]>(`${BaseConstants.baseUrl}${AppConstants.apiEndPoints.exportAzureKeyVault}`, exportKeysReq);
  }

  importSecrets(importKeysReq: IAzureKeyManager) {
    return this.http.post(`${BaseConstants.baseUrl}${AppConstants.apiEndPoints.importAzureKeyVault}`, importKeysReq,
      { responseType: 'text' });
  }

  showErrorMessage(message: string) {
    this.toastrService.error(message);
  }
  showSuccessMessage(message: string) {
    this.toastrService.success(message);
  }
}
