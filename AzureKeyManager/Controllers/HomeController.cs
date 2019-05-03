using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using AzureKeyManager.Models;
using System.IO;
using System.Web;
using Newtonsoft.Json;

namespace AzureKeyManager.Controllers
{
    public class HomeController : Controller
    {
        string path = System.IO.Directory.GetCurrentDirectory() + "\\config.txt";
        AzureKeyManager.core.AzureKeyManagerInterface netManagerInterface = new AzureKeyManager.Data.AzureKeyManagerData();
        public IActionResult Index()
        {
            ViewData["Success"] = TempData["Success"];
            return View();
        }

        public IActionResult Config()
        {
            core.AzureKeyManager azureNet = new core.AzureKeyManager();
            try
            {
                var fileContents = System.IO.File.ReadAllLines(path);
                azureNet.ClientID = fileContents[0];
                azureNet.SecretKey = fileContents[1];
                azureNet.TenantID = fileContents[2];
                azureNet.URi = fileContents[3];
            }
            catch(Exception)
            {

            }
            return View(azureNet);
        }

        public IActionResult Export()
        {
            core.AzureKeyManager azureNet = new core.AzureKeyManager();
            try
            {
                var fileContents = System.IO.File.ReadAllLines(path);
                if (fileContents != null)
                {
                    azureNet.ClientID = fileContents[0];
                    azureNet.SecretKey = fileContents[1];
                    azureNet.TenantID = fileContents[2];
                    azureNet.URi = fileContents[3];
                }
                List<core.DataList> datalist = netManagerInterface.getKeyList(azureNet);
                return View(datalist);
            }
            catch(FileNotFoundException)
            {
                TempData["Success"] = "Please provide configuration details...";
                return RedirectToAction("Index");
            }
            
        }

        public IActionResult Import()
        {
            ViewData["Message"] = TempData["Error"];
            return View();
        }

        [HttpPost]
        public IActionResult Importfile(core.AzureKeyManager azureNet)
        {
            if (azureNet.file == null || azureNet.URi == null)
            {
                TempData["Error"] = "Both fields are required!!!";
                return RedirectToAction("Import");
            }
                
            List<core.DataList> datalist = new List<core.DataList>();
                using (StreamReader sr = new StreamReader(azureNet.file))
            {
                datalist = JsonConvert.DeserializeObject<List<core.DataList>>(sr.ReadToEnd());
            }
            TempData["URi"] = azureNet.URi;
            return View(datalist);
        }

        [HttpGet]
        public IActionResult Importfile(string serializedModel)
        {
            ViewData["Error"] = TempData["PublishError"];
            List<core.DataList> datalist = JsonConvert.DeserializeObject<List<core.DataList>>(serializedModel);
            return View(datalist);
        }

        [HttpPost]
        public IActionResult Loadfile(List<core.DataList> datalist)
        {
            core.AzureKeyManager azureNet = new core.AzureKeyManager();
            var fileContents = System.IO.File.ReadAllLines(path);
            if (fileContents != null)
            {
                azureNet.ClientID = fileContents[0];
                azureNet.SecretKey = fileContents[1];
                azureNet.TenantID = fileContents[2];
                azureNet.URi = TempData["URi"].ToString();
            }
            bool result = netManagerInterface.submitKey(azureNet,datalist);
            if(result)
            {
                TempData["Success"] = "Secrets loaded successfully...";
                return RedirectToAction("Index");
            }
            TempData["PublishError"] = "Issue in storing secrets.";
            return RedirectToAction("Importfile", new { serializedModel = JsonConvert.SerializeObject(datalist.ToList()) });
        }
        [HttpPost]
        public IActionResult Config(AzureKeyManager.core.AzureKeyManager azureNet)
        {
            bool result = netManagerInterface.ConnectionVerification(azureNet);
            if (result)
            {
                TempData["Success"] = "Configuration saved...";
                string[] lines = { azureNet.ClientID, azureNet.SecretKey, azureNet.TenantID, azureNet.URi };
                System.IO.File.WriteAllLines(path, lines);
                return RedirectToAction("Index");
            }
            ViewData["Error"] = "Unable to connect to Azure Key Vault...";
            return View();
        }
        public IActionResult Error()
        {
            return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
        }
    }
}
