---
title: C#
---

## Static Constructors
> A static constructor does not take access modifiers or have parameters.
>
> A static constructor is called automatically to initialize the class before the first instance is created or any static members are referenced.
>
> A typical use of static constructors is when the class is using a log file and the constructor is used to write entries to this file.

## Task
> GetAwaiter GetResult do the same thing as Wait (which is <b>block</b>), but the only difference is that GetAwaiter GetResult will unwrap any exceptions thrown inside the DoSomeWork method.
>
> In .NET 4.5, it has become policy to expose methods that could take longer than 50 milliseconds as asynchronous only.
>
> The clock interval is about 15 milliseconds on current multiprocessor systems.
>
> If you have many tasks that take more than a few hundred milliseconds to execute, the thread pool will not be as effective.
>
> For GUI programs, asynchronous programming frees up the UI thread; this permits the GUI application to remain responsive to user input. 
> For server applications, asynchronous programming frees up request threads; this permits the server to use its threads to serve more requests.
>
> <b>Multithreading</b>: A form of concurrency that uses multiple threads of execution.
> 
> <b>Parallel processing</b>: Doing lots of work by dividing it up among multiple threads that run concurrently.
> 
> <b>Asynchronous programming</b>: A form of concurrency that uses futures(promise) or callbacks to avoid unnecessary threads.

> <b>SynchronizationContext</b> was designed for ASP.NET to manage this process, here are the most important aspects of its work:
> * Provides a way to queue a unit of work to a context
> * Every thread has a "current" context
> * Keeps a count of outstanding asynchronous operations

> <b>Without SynchronizationContext</b>
> * Task continuations are queued against the thread pool and can run in parallel
> * HttpContext is not thread safe!
> * No deadlocks if you block a Task with Task.Wait or Task.Result


## Exception
> One issue with the method of throwing when a speaker is not found is that it brings a possibly unexpected and abrupt end to the application flow. The entire logic path the application took to get to this method is now destroyed and the exception must be handled. Even when we handle the exception, C# uses extra CPU cycles on the first-chance exception error handling process. Sometimes throwing is definitely the right decision; however, exceptions should be reserved for truly exceptional events. As discussed earlier, it is far more likely that a Get could be called with an invalid ID than with a valid one. So, in this case it is not necessarily a properly exceptional event for an invalid speaker to be requested

## Linq Extension

```csharp
public static class DelegatePredicateBuilder
{
    public static Func<T, bool> True<T>() { return f => true; }
    public static Func<T, bool> False<T>() { return f => false; }

    public static Func<T, bool> Or<T>(this Func<T, bool> expr1,
                                    Func<T, bool> expr2)
    {
        return t => expr1(t) || expr2(t);
    }

    public static Func<T, bool> And<T>(this Func<T, bool> expr1,
                                            Func<T, bool> expr2)
    {
        return t => expr1(t) && expr2(t);
    }
}
```
## Interface
> An interface defines the behavior that a class has, but not  how  this behavior is implemented

## Settings
> A developer should be aware of the practice that all the environment-related settings
should go into appsettings.json, and any setting related to C# code should go into the Constants class.

## dotnet publish
```
dotnet publish -c release -r win10-x64

dotnet publish -c Release --self-contained -r ubuntu.18.04-x64
```

## HttpClient Proxy
```csharp
var proxy = new WebProxy
{
    Address = new Uri("http://ip:port")
};

var httpClientHandler = new HttpClientHandler
{
    Proxy = proxy,
};

var client = new HttpClient(handler: httpClientHandler, disposeHandler: true);
```

## Pass Func with a variable number of arguments 

```csharp
protected ValidationResult Validate(params Func<ValidationResult>[] items)
{
    var validationResult = new ValidationResult();

    foreach(var item in items)
    {
        validationResult = item();

        if (!validationResult.IsValid)
        {
            return validationResult;
        }
    }

    return validationResult;
}

var validationResult = Validate(() => Validate1(a), () => Validate2(a, b));

```

## Notes

> ternary conditional operator
>
> null-coalescing operator

## SET Environment Variable
```
Environment.SetEnvironmentVariable("ASPNETCORE_ENVIRONMENT", "Development");
```
## Install Windows Service
```
sc.exe create Service1 binPath= "C:\...\Service1.exe" obj= "[UserName]" password= ""  start= auto
sc.exe start Service1
```
###
```xml
<appSettings>
	<add key="aspnet:UseHostHeaderForRequestUrl" value="true" />
</appSettings>
```
```
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

### TLS 1.2
```csharp
ServicePointManager.DefaultConnectionLimit = 100;
ServicePointManager.ServerCertificateValidationCallback = (senderX, certificate, chain, sslPolicyErrors) => true;
ServicePointManager.Expect100Continue = true;
ServicePointManager.SecurityProtocol = SecurityProtocolType.Tls12;
```

### Publish Single File
```xml
<PublishSingleFile>true</PublishSingleFile>
<PublishTrimmed>true</PublishTrimmed>
<RuntimeIdentifier>win-x64</RuntimeIdentifier>
```

### Ignore appsettings.json on Publish
```xml
<ItemGroup>
    <Content Update="appsettings.json" CopyToPublishDirectory="Never" />
    <Content Update="appsettings.*.json" CopyToPublishDirectory="Never" />
</ItemGroup>
```

### RuntimeCompilation on Debug
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

### UTF in page source
```csharp
services.Configure<WebEncoderOptions>(options =>
{
    options.TextEncoderSettings = new TextEncoderSettings(UnicodeRanges.All);
});
```

### Request Logging
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

### Thread Count
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

### Fire and Forget
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
