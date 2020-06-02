using System;
using System.Collections.Generic;

namespace AzureKeyManager.core
{
  //public class AzureKeyManager
  //{
  //    public string ObjectID { get; set; }
  //    public string ClientID { get; set; }
  //    public string TenantID { get; set; }
  //    public string SubscriptionID { get; set; }
  //    public string SecretKey { get; set; }
  //    public string URi { get; set; }
  //    public string file { get; set; }
  //}

  public class DataList
  {
    public string secretname { get; set; }
    public string secrettype { get; set; }
    public string secretvalue { get; set; }
  }

  public class KeyList
  {
    public string keyname { get; set; }
  }

  public class AzureKeyManager
  {
    public string clientID { get; set; }
    public string tenantID { get; set; }
    public string secretKey { get; set; }
    public string keyVaultBaseUrl { get; set; }
    public List<DataList> submitSecrets { get; set; }
  }
}
