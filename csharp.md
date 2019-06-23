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

## Exception
> One issue with the method of throwing when a speaker is not found is that it brings a possibly unexpected and abrupt end to the application flow. The entire logic path the application took to get to this method is now destroyed and the exception must be handled. Even when we handle the exception, C# uses extra CPU cycles on the first-chance exception error handling process. Sometimes throwing is definitely the right decision; however, exceptions should be reserved for truly exceptional events. As discussed earlier, it is far more likely that a Get could be called with an invalid ID than with a valid one. So, in this case it is not necessarily a properly exceptional event for an invalid speaker to be requested
