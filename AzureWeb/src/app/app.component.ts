import { Component, OnInit, ElementRef } from '@angular/core';
import { BroadcastService, MsalService } from '@azure/msal-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { AppService } from './service/app.service';
import { IAzureKeyManager, IDataList } from './model/index';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit {
  title = 'azure-vault-manager';
  credentialsForm: FormGroup;
  fileToUpload: File = null;
  secretFileData: IDataList[];
  exportedSecrets: IDataList[];


  constructor( private formBuilder: FormBuilder, private appService: AppService) {
  }
  ngOnInit() {
    this.secretFileData = [];
    this.exportedSecrets = [];
    // this.broadcastService.subscribe('msal:loginSuccess', (payload) => {
    //   // do something here
    //   debugger;
    //   console.log(JSON.stringify(payload));
    //   // console.log(payload["token"]);
    //   // const user = this.msalService.getUser();
    //   // this.msalService.acquireTokenSilent(['d93de0aa-af9b-47f2-b1b6-5bff81d61001'],
    //   // 'https://login.microsoftonline.com/8c3dad1d-b6bc-4f8b-939b-8263372eced6', user
    //   // );
    //   sessionStorage.setItem('token', payload.token);
    // });
    // this.broadcastService.subscribe('msal:acquireTokenSuccess', (payload) => {
    //   console.log(JSON.stringify(payload));
    //   sessionStorage.setItem('token', payload.token);
    // });

    // this.broadcastService.subscribe('msal:acquireTokenFailure', payload => {
    //   // do something here
    //   console.log(JSON.stringify(payload));
    // });
    this.credentialsForm = this.formBuilder.group({
      clientID: ['', [Validators.required]],
      tenantID: ['', [Validators.required]],
      secretKey: ['', [Validators.required]],
      keyVaultBaseUrl: ['', [Validators.required]]
    });
  }

  exportSecrets() {
    this.secretFileData = [];
    this.exportedSecrets = [];
    const exportKeysReq: IAzureKeyManager = {
      clientID: this.credentialsForm.controls.clientID.value.trim(),
      tenantID: this.credentialsForm.controls.tenantID.value.trim(),
      keyVaultBaseUrl: this.credentialsForm.controls.keyVaultBaseUrl.value.trim(),
      secretKey: this.credentialsForm.controls.secretKey.value.trim(),
    };
    this.appService.exportSecrets(exportKeysReq).subscribe(resp => {
      if (resp) {
        console.log(resp);
        this.exportedSecrets = resp;
      }
      // this.appService.showErrorMessage('Error occured, Please contact admin');
    });
  }

  selectFile(files: FileList) {
    this.secretFileData = [];
    this.exportedSecrets = [];
    if (files.item(0).type !== 'application/json') {
      return;
    }
    this.fileToUpload = files.item(0);
    const fileReader = new FileReader();
    fileReader.readAsText(this.fileToUpload, 'UTF-8');
    fileReader.onload = () => {
      this.secretFileData = JSON.parse(fileReader.result.toString());
    };
    fileReader.onerror = (error) => {
      console.log(error);
      this.appService.showErrorMessage('Error occured while reading json file');
    };
    if (!(this.secretFileData.length > 0)) {
      this.appService.showErrorMessage('Error occured while reading json file');

    }
  }

  importSecrets() {
    if (this.secretFileData.length <= 0) {
      return;
    }
    const importKeysReq: IAzureKeyManager = {
      clientID: this.credentialsForm.controls.clientID.value.trim(),
      tenantID: this.credentialsForm.controls.tenantID.value.trim(),
      keyVaultBaseUrl: this.credentialsForm.controls.keyVaultBaseUrl.value.trim(),
      secretKey: this.credentialsForm.controls.secretKey.value.trim(),
      submitSecrets: this.secretFileData,
    };
    if (importKeysReq.submitSecrets.length > 0) {
      this.appService.importSecrets(importKeysReq).subscribe(resp => {
        if (resp) {
          console.log(resp);
          this.secretFileData = [];
        }
        //  this.appService.showErrorMessage('Error occured, Please contact admin');
      });
    }
  }
}

