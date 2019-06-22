---
title: Test Driven Development
---

## Testing is difficult
> Testing can be difficult. This is especially true with an application that was not written with testability in mind. If you have static methods and implementations using concrete references scattered throughout your code, you will have difficulty adding tests at a later date.

## User stories
> User stories are commonly used in Agile software development for requirement definitions. The format for a user story is fairly simple and consists of three parts: Role, Request, and Reason. 
>
> As a {Role} I want [Request} So that {Reason}
* Arrange: includes anything that exists as a prerequisite of the test.
* Act: The piece of production code that is being tested.
* Assert: The result, or assertion (the expected result), is exactly what it sounds like.

## YAGNI – you aren't gonna need it
> Don't write code in anticipation of a future need. This is wasteful and often costly to develop and maintain.

## Repository Pattern
> The data layer abstraction implementation --> repository pattern.

## Pose
> Pose allows you to replace any .NET method (including static and non-virtual) with a delegate. It is similar to Microsoft Fakes but unlike it Pose is implemented entirely in managed code (Reflection Emit API). Everything occurs at runtime and in-memory, no unmanaged Profiling APIs and no file system pollution with re-written assemblies.
>
> Pose is cross platform and runs anywhere .NET is supported. It targets .NET Standard 2.0 so it can be used across .NET platforms including .NET Framework, .NET Core, Mono and Xamarin. See version compatibility table here.
>
> <a href="https://www.nuget.org/packages/Pose/">Nuget</a>
