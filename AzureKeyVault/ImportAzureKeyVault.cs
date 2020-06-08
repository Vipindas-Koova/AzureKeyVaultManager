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
  public static class ImportAzureKeyVault
  {
    [FunctionName("ImportAzureKeyVault")]
    public static async Task<HttpResponseMessage> Run(
            [HttpTrigger(AuthorizationLevel.Anonymous, "post", Route = null)] HttpRequest req,
            ILogger log)
    {
      try
      {
        log.LogInformation("Import Called");

        string requestBody = await new StreamReader(req.Body).ReadToEndAsync();

        log.LogInformation("Import request body" + JsonConvert.DeserializeObject(requestBody));
        AzureKeyManager.core.AzureKeyManager data = JsonConvert.DeserializeObject<AzureKeyManager.core.AzureKeyManager>(requestBody);

        IAzureKeyManagerInterface _azureKeyManagerData = new AzureKeyManagerData();
        if (_azureKeyManagerData.ConnectionVerification(data))
        {
          log.LogInformation("Connection established");
          var response = _azureKeyManagerData.submitKey(data);
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
        log.LogError("Import error" + ex);
        return new HttpResponseMessage(HttpStatusCode.BadRequest)
        {
          Content = new StringContent(JsonConvert.SerializeObject(ex.Message), Encoding.UTF8, "application/json")
        };
      }
    }

  }

}
