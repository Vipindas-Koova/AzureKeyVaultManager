using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using AzureKeyManager.core;
using Microsoft.Azure.KeyVault;
using Microsoft.Azure.KeyVault.Models;
using Microsoft.IdentityModel.Clients.ActiveDirectory;

namespace AzureKeyManager.Data
{
  public class AzureKeyManagerData : IAzureKeyManagerInterface
  {
    private static core.AzureKeyManager publicazure;

    public bool ConnectionVerification(core.AzureKeyManager azureNet)
    {
      publicazure = azureNet;
      KeyVaultClient kv = new KeyVaultClient(new KeyVaultClient.AuthenticationCallback(GetToken));
      if (kv == null)
        return false;
      return true;
    }
    public static async Task<string> GetToken(string authority, string resource, string scope)
    {
      var authContext = new AuthenticationContext(authority);
      ClientCredential clientCred = new ClientCredential(publicazure.clientID, publicazure.secretKey);
      AuthenticationResult result = await authContext.AcquireTokenAsync(resource, clientCred);
      if (result == null)
        throw new InvalidOperationException("Failed to obtain the JWT token");
      return result.AccessToken;
    }

    public List<KeyList> getKeynameList(core.AzureKeyManager azureNet)
    {
      var list = new List<KeyList>();
      publicazure = azureNet;
      KeyVaultClient kv = new KeyVaultClient(new KeyVaultClient.AuthenticationCallback(GetToken));
      var keys = kv.GetKeysAsync(azureNet.keyVaultBaseUrl);
      foreach (var key in keys.Result)
      {
        list.Add(new KeyList() { keyname = key.Identifier.Name });
      }
      return list;
    }
    public List<DataList> getKeyList(core.AzureKeyManager azureNet)
    {
      publicazure = azureNet;
      KeyVaultClient kv = new KeyVaultClient(new KeyVaultClient.AuthenticationCallback(GetToken));
      var list = new List<DataList>();
      var secret = kv.GetSecretsAsync(azureNet.keyVaultBaseUrl);
      foreach (SecretItem secrets in secret.Result)
      {
        var name = secrets.Id.Substring(secrets.Id.LastIndexOf('/') + 1);
        list.Add(new DataList() { secretname = name, secrettype = secrets.ContentType });
      }
      return list;
    }

    public bool submitKey(core.AzureKeyManager azureNet)
    {
      publicazure = azureNet;
      KeyVaultClient kv = new KeyVaultClient(new KeyVaultClient.AuthenticationCallback(GetToken));
      foreach (var item in azureNet.submitSecrets)
      {
        var result = kv.SetSecretAsync(azureNet.keyVaultBaseUrl, item.secretname, item.secretvalue);
      }
      return true;
    }
  }
}
