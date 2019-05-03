using System;

namespace AzureKeyManager.core
{
    public class AzureKeyManager
    {
        public string ObjectID { get; set; }
        public string ClientID { get; set; }
        public string TenantID { get; set; }
        public string SubscriptionID { get; set; }
        public string SecretKey { get; set; }
        public string URi { get; set; }
        public string file { get; set; }
    }

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
}
