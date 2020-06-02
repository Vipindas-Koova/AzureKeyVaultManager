using System;
using System.Collections.Generic;
using System.Text;

namespace AzureKeyManager.core
{
    public interface IAzureKeyManagerInterface
    {
        bool ConnectionVerification(AzureKeyManager azureNet);
        List<DataList> getKeyList(AzureKeyManager azureNet);
        List<KeyList> getKeynameList(AzureKeyManager azureNet);
        bool submitKey(AzureKeyManager azureNet);
        
    }
}
