import { IDataList } from './IDataList';

export interface IAzureKeyManager {
    clientID: string;
    tenantID: string;
    secretKey: string;
    keyVaultBaseUrl: string;
    submitSecrets?: IDataList[];
}
