using System;
using System.IO;
using System.Threading.Tasks;
using Microsoft.Azure.WebJobs;
using Microsoft.Azure.WebJobs.Extensions.Http;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json;
using AzureKeyManager.Data;
using AzureKeyManager.core;
using System.Net.Http;
using System.Net;
using System.Text;

namespace AzureKeyVault
{
  public static class ExportAzureKeyVault
  {
    [FunctionName("ExportAzureKeyVault")]
    public static async Task<HttpResponseMessage> Run(
            [HttpTrigger(AuthorizationLevel.Anonymous, "post", Route = null)] HttpRequest req,
            ILogger log)
    {
      try
      {
        log.LogInformation("Export Called");
        string requestBody = await new StreamReader(req.Body).ReadToEndAsync();
        AzureKeyManager.core.AzureKeyManager data = JsonConvert.DeserializeObject<AzureKeyManager.core.AzureKeyManager>(requestBody);

        log.LogInformation("Export request body" + JsonConvert.DeserializeObject(requestBody));

        IAzureKeyManagerInterface _azureKeyManagerData = new AzureKeyManagerData();
        if (_azureKeyManagerData.ConnectionVerification(data))
        {
          var response = _azureKeyManagerData.getKeyList(data);
          return new HttpResponseMessage(HttpStatusCode.OK)
          {
            Content = new StringContent(JsonConvert.SerializeObject(response), Encoding.UTF8, "application/json")
          };
        }
        return new HttpResponseMessage(HttpStatusCode.BadRequest)
        {
          Content = new StringContent(JsonConvert.SerializeObject("Failed"), Encoding.UTF8, "application/json")
        };
      }
      catch (Exception ex)
      {
        log.LogError("Export error" + ex);
        return new HttpResponseMessage(HttpStatusCode.BadRequest)
        {
          Content = new StringContent(JsonConvert.SerializeObject(ex.Message), Encoding.UTF8, "application/json")
        };
      }
    }
  }
}