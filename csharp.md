# CSharp

## Static Constructors</h4>
> A static constructor does not take access modifiers or have parameters.
>
> A static constructor is called automatically to initialize the class before the first instance is created or any static members are referenced.
>
> A typical use of static constructors is when the class is using a log file and the constructor is used to write entries to this file.
>
> In .NET 4.5, it has become policy to expose methods that could take longer than 50 milliseconds as asynchronous only.

## Task
> GetAwaiter GetResult do the same thing as Wait (which is <b>block</b>), but the only difference is that GetAwaiter GetResult will unwrap any exceptions thrown inside the DoSomeWork method.