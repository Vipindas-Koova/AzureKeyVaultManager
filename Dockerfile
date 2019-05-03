FROM microsoft/dotnet:2.1-aspnetcore-runtime AS base
WORKDIR /app
EXPOSE 80

FROM microsoft/dotnet:2.1-sdk AS build
WORKDIR /src
COPY ["AzureKeyManager/AzureKeyManager.csproj", "AzureKeyManager/"]
COPY ["AzureKeyManager.Data/AzureKeyManager.Data.csproj", "AzureKeyManager.Data/"]
COPY ["AzureKeyManager.core/AzureKeyManager.core.csproj", "AzureKeyManager.core/"]
RUN dotnet restore "AzureKeyManager/AzureKeyManager.csproj"
COPY . .
WORKDIR "/src/AzureKeyManager"
RUN dotnet build "AzureKeyManager.csproj" -c Release -o /app

FROM build AS publish
RUN dotnet publish "AzureKeyManager.csproj" -c Release -o /app
RUN dotnet tool install ElectronNET.CLI -g

FROM base AS final
WORKDIR /app
COPY --from=publish /app .

ENTRYPOINT ["dotnet","AzureKeyManager.dll"]