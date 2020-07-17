import { BaseConstants } from '../core.module';

export class AppConstants extends BaseConstants {


    public static apiEndPoints = {
        exportAzureKeyVault: '/api/ExportAzureKeyVault',
        importAzureKeyVault: '/api/ImportAzureKeyVault',

    };
}
