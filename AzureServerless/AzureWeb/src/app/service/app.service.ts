import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpHeaders} from '@angular/common/http';
import { IAzureKeyManager, IDataList } from '../model';
import { Observable } from 'rxjs';
import { ToastrService } from 'ngx-toastr';


@Injectable({
  providedIn: 'root'
})
export class AppService {

  constructor(private http: HttpClient, private toastrService: ToastrService) { }


  exportSecrets(exportKeysReq: IAzureKeyManager): Observable<IDataList[]> {
    return this.http.post<IDataList[]>('https://demofunctionappnitor.azurewebsites.net/api/ExportAzureKeyVault', exportKeysReq);
  }

  importSecrets(importKeysReq: IAzureKeyManager) {
    return this.http.post('https://demofunctionappnitor.azurewebsites.net/api/ImportAzureKeyVault', importKeysReq,
     {responseType: 'text'});
  }

  showErrorMessage(message: string) {
    this.toastrService.error(message);
}
showSuccessMessage(message: string) {
    this.toastrService.success(message);
}
}
