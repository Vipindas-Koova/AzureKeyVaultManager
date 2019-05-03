# What is AzureKeyVaultManager?
It is a Open source dotnet-core based web app (also launchable as desktop app using electron), that helps in bulk import or export of secrets to Azure Keyvault. 

The current version supports bulk import and export of Azure KeyVault secrets

## Need for AzureKeyVaultManager
Enterprise CI/CD process generally applies configuration values to the app during the deployment process. This often involves refering some repo. Configuration values mostly involves, but not limited to encryption keys,certificates, password, connection strings etc.

However, compliance heavy industry often disctates configuration to be stored in some secret store (certified vault solution) rather than an open repo. It is expected that the CI/CD process access this secret store during the automated deployment process and apply the configuration to the app being deployed.

## Steps to run: Docker (from public image)
1. Run the command "docker pull seeker14/nitor-azurekeyvaultmanager"
2. docker run -d -p 8080:80 seeker14/nitor-azurekeyvaultmanager:latest
3. go to browser and hit http://localhost:8080

## Steps to run: Local Desktop (Tested on windows only)
1. Download the git repo or clone locally
2. install dotnet 2.1 framework from https://dotnet.microsoft.com/download/dotnet-core/2.1
3. Run the command in terminal  "dotnet tool install ElectronNET.CLI -g"
4. Run the command "dotnet build"
4. Run the command "electronize start"
5. You should see a desktop app showing up

## Steps to run: Web (Tested on windows only)
1. Download the git repo or clone locally
2. install dotnet 2.1 framework from https://dotnet.microsoft.com/download/dotnet-core/2.1
3. run the command "cd .\AzureKeyManager\"
4. run the command "dotnet run"
5. Check for the terminal output for the port at which app is listening and open the same in browser

## Steps to run: docker (building image locally and run)
1. Download the git repo or clone locally
2. Install and make sure docker is running locally
3. run the command "docker build . -t <your-prefered-tagname>"
4. run the command "docker images", check for the image id against the image that you created
5. run the command "docker run -d -p 8080:80 <image-id-from-above-step>
6. go to browser and hit http://localhost:8080 

## Using the App
1. Make sure Azure KeyVault service is setup
2. Make sure you register the app (specify a readable name such as keyvaultmanager) in Azure App registrations
3. Collect the values client id and client secret key from #2
4. collect the tenant id from Azure AD
5. collect the keyvault url from #1
6. Ensure the app created in #2 is provided appropriate access in keyvault's IAM policies
7. In the AzureKeyVaultManager tool, key in config values such as tenantid, client id, client secret key and keyvault url
8. Use the import or export option to get started

Developer Credits: https://github.com/adigan1310
