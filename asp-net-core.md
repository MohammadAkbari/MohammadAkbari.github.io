---
title: ASP.NET Core
---

## SET Environment Variable
```
Environment.SetEnvironmentVariable("ASPNETCORE_ENVIRONMENT", "Development");
```
### Publish on linux
```
dotnet publish -c release -r linux-x64 --self-contained false -o PATH
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

```csharp
public class RequestLoggingMiddleware
{
	private readonly RequestDelegate _next;
	private readonly ILogger<RequestLoggingMiddleware> _logger;

	public RequestLoggingMiddleware(RequestDelegate next, ILogger<RequestLoggingMiddleware> logger)
	{
		this._next = next;
		_logger = logger;
	}

	public async Task Invoke(HttpContext context)
	{
		var builder = new StringBuilder(Environment.NewLine);
		foreach (var header in context.Request.Headers)
		{
			builder.AppendLine($"{header.Key}:{header.Value}");
		}

		_logger.LogInformation(builder.ToString());

		await _next(context);
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

## Show Request Header
```csharp
endpoints.MapGet("/show-headers", async context =>
{
    var requestHeaders = string.Join("<br/>", context.Request.Headers
	.OrderBy(e => e.Key).Select(e => $"{e.Key}: {e.Value}"));

    var output = $"<h2>Request headers</h2>{requestHeaders}";
    context.Response.ContentType = "text/html";
    await context.Response.WriteAsync(output);
});	
```
## Left-To-Right Mark
Unicode Hex Character Code &#x200e;   

## Minimal
```csharp
var webApplicationOptions = new WebApplicationOptions()
{
    ContentRootPath = AppContext.BaseDirectory,
    Args = args,
    ApplicationName = System.Diagnostics.Process.GetCurrentProcess().ProcessName
};

var builder = WebApplication.CreateBuilder(webApplicationOptions);	
```

