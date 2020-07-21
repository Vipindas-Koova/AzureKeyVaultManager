# Azure Key Vault Manager
This is an azure-serverless example which is used to import and export secrets from Azure Key Vault. It uses Angular application as front end and azure function app as backend.
This application also includes Azure AD authentication for angular.

# Initial Set Up

App Registration and Function App 
1. Create a new app registration in Azure AD.
2. Give your app a clear readable name.
3. Select the supported accounts : Single Tenant – Only accounts from the current Azure AD instance will be able to sign in.
4. Enter the redirect URI. This is the URI of the application where angular app is hosted.
5. After saving please note the Client Id as well as tenant Id of your application.
6. Create a new function app in azure.

Storage Account
1. Create a new storage account in Azure.
2. Go to Static website Tab in your storage account and enable static website.
3. Set Index document name as index.html.
4. A new container named $web will be created in your storage account.

# Project set up and deployment

1. azure-pipelines.yml file in the project can be used to automate deployment. You can use Azure devops yml pipeline for deployment
2. This file deploys both angular as well as API on Azure static website and function app respectively.
3. Following properties needs to be modified in azure-pipelines.yml:
 a. azureSubscription = "Your Azure Subscription"
 b. functionAppName = "Name of function app you created in the above subscription"
 c. storage = "Name of storage account"
 d. configuration.baseApiUrl = "URI of your function app"
 e. configuration.authority = "https://login.microsoftonline.com/{tenantId of your function app}"
 f. configuration.redirectUri = "URI of your angular app"
