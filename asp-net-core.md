---
title: ASP.NET Core
---

## SET Environment Variable
```
Environment.SetEnvironmentVariable("ASPNETCORE_ENVIRONMENT", "Development");
```
## Install Windows Service
```
sc.exe create Service1 binPath= "C:\...\Service1.exe" obj= "[UserName]" password= ""  start= [auto | delayed-auto]
sc.exe start Service1

sc.exe queryex <service name>
taskkill /F /PID <Service PID>

taskkill /F /IM mmc.exe
```
## web.config
```xml
<appSettings>
	<add key="aspnet:UseHostHeaderForRequestUrl" value="true" />
</appSettings>
```
```xml
<system.webServer>
  <security>
    <requestFiltering removeServerHeader ="true" />
  </security>
  <httpProtocol>
    <customHeaders>
      <remove name="X-Powered-By" />
    </customHeaders>
  </httpProtocol>
</system.webServer>
```

## Publish Single File
```xml
<PublishSingleFile>true</PublishSingleFile>
<PublishTrimmed>true</PublishTrimmed>
<RuntimeIdentifier>win-x64</RuntimeIdentifier>
```

## Ignore appsettings.json on Publish
```xml
<ItemGroup>
    <Content Update="appsettings.json" CopyToPublishDirectory="Never" />
    <Content Update="appsettings.*.json" CopyToPublishDirectory="Never" />
</ItemGroup>
```

## RuntimeCompilation on Debug
```xml
<ItemGroup>
  <PackageReference Include="Microsoft.AspNetCore.Mvc.Razor.RuntimeCompilation" 
		    Version="3.1.1" Condition="'$(Configuration)' == 'Debug'"/>
</ItemGroup>
```
```json
  "profiles": {
    "IIS Express": {
      "commandName": "IISExpress",
      "launchBrowser": true,
      "environmentVariables": {
        "ASPNETCORE_ENVIRONMENT": "Development",
        "ASPNETCORE_HOSTINGSTARTUPASSEMBLIES": "Microsoft.AspNetCore.Mvc.Razor.RuntimeCompilation"
      }
    }
```

## UTF in page source
```csharp
services.Configure<WebEncoderOptions>(options =>
{
    options.TextEncoderSettings = new TextEncoderSettings(UnicodeRanges.All);
});
```

## Request Logging
```csharp
public class RequestLoggingMiddleware
{
    private readonly RequestDelegate _next;
    private readonly ILogger<RequestLoggingMiddleware> _logger;

    public RequestLoggingMiddleware(RequestDelegate next, ILogger<RequestLoggingMiddleware> logger)
    {
        _next = next;
        _logger = logger;
    }

    public async Task Invoke(HttpContext context)
    {
        try
        {
            var watch = new Stopwatch();

            var username = httpContext.User.Identity.IsAuthenticated ? 
							httpContext.User.Identity.Name : "anonymous";
            LogContext.PushProperty("User", username);

            var ip = httpContext.Connection.RemoteIpAddress.ToString();
            LogContext.PushProperty("IP", !String.IsNullOrWhiteSpace(ip) ? ip : "unknown");

            context.Response.OnStarting(() =>
            {
                watch.Stop();

                context.Response
                    .Headers
                    .TryAdd("X-Processing-Time-Milliseconds",
                        new[] { watch.ElapsedMilliseconds.ToString() });

                context.Response
                     .Headers
                     .Add("X-Machine", new[] { Environment.MachineName });
                
                return Task.CompletedTask;
           });

           watch.Start();
	   
           await _next(context);
       }
       finally
       {
          _logger.LogInformation(
                "Request {method} {url} => {statusCode}",
                    context.Request?.Method,
                    context.Request?.Path.Value,
                    context.Response?.StatusCode);
       }
   }
}
```

## Thread Count
```csharp
public class InfoController : ApiController
{
    [HttpGet]
    [Route("info11")]
    public object Index()
    {
        int logicalProcessorCount = Environment.ProcessorCount;
        ThreadPool.GetMinThreads(out var minimumWorkerThreadCount, out var minimumIOCThreadCount);
        ThreadPool.GetMaxThreads(out var maximumWorkerThreadCount, out var maximumIOCThreadCount);
        ThreadPool.GetAvailableThreads(out int workerThreads, out int completionPortThreads);
        int currentProcessThreadsCount = Process.GetCurrentProcess().Threads.Count;

        return new
        {
            logicalProcessorCount,
            minimumWorkerThreadCount,
            minimumIOCThreadCount,
            maximumWorkerThreadCount,
            maximumIOCThreadCount,
            workerThreads,
            completionPortThreads,
            currentProcessThreadsCount
        };
    }
}
```

## Fire and Forget
```csharp
[HttpGet("/fire-and-forget")]
public IActionResult FireAndForget()
{
    _ = Task.Run(async () =>
    {
	await Task.Delay(10000);
	_logger.LogInformation("--------------Hi------------");
    });

    return Accepted();
}
```
