using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ElectronNET.API;
using ElectronNET.API.Entities;
using Microsoft.AspNetCore.Mvc;

namespace AzureKeyManager.Controllers
{
    public class DialogsController : Controller
    {
        private static bool saveAdded;
        public IActionResult Index()
        {
            if (!HybridSupport.IsElectronActive || saveAdded) return Ok();

            Electron.IpcMain.On("save-dialog", async (args) =>
            {
                var mainWindow = Electron.WindowManager.BrowserWindows.First();
                var options = new SaveDialogOptions
                {
                    Title = "Export Keys as JSON file",
                    Filters = new FileFilter[]
                    {
                    new FileFilter { Name = "JSON",
                                     Extensions = new string[] {"json" } }
                    }
                };

                var result = await
                      Electron.Dialog.ShowSaveDialogAsync(mainWindow, options);
                Electron.IpcMain.Send(mainWindow, "save-dialog-reply", result);
            });

            Electron.IpcMain.On("open-dialog", async (args) =>
            {
            var mainWindow = Electron.WindowManager.BrowserWindows.First();
                var options = new OpenDialogOptions
                {
                    Title = "Import Keys as JSON file",
                    Filters = new FileFilter[]
                        {
                    new FileFilter { Name = "JSON",
                                     Extensions = new string[] {"json" } }
                        }
                };                

                var result = await
                      Electron.Dialog.ShowOpenDialogAsync(mainWindow,options);
                Electron.IpcMain.Send(mainWindow, "open-dialog-reply", result);
            });

            saveAdded = true;

            return Ok();
        }
    }
}