---
title: Design
---

## Architecting software
> Architecting software always involves tension between pragmatism and idealism — balancing product needs, the pressures of growth, and the capabilities of a team.

## Cohesion, Coupling
> Gather together the things that change for the same reasons. Separate those things that change for different reasons.

## Framework vs Library

![framework vs library](images/framework-vs-library.png){: .center-image }

## Code Smell (Design Smells)
> Agile teams apply principles to remove smells. They don’t apply principles when there are no smells. It is a mistake to unconditionally conform to a principle just because it is a principle. Principles are not a perfume to be liberally scattered all over the system. Overconformance to the principles leads to the design smell of Needless Complexity.

### Rigidity
> The system is hard to change because every change forces many other changes to other parts of the system.
>
> A design is rigid if a single change causes a cascade of subsequent changes in dependent modules.
>
> The smell of Rigidity is often a result of insufficient attention to The Open–Closed Principle (OCP).

### Fragility
> The design is easy to break.
>
> Changes cause the system to break in places that have no conceptual relationship to the part that was changed.

### Immobility
> The design is hard to reuse.
>
> It is hard to disentangle the system into components that can be reused in other systems.
>
> A design is immobile when it contains parts that could be useful in other systems, but the effort and risk involved with separating those parts from the original system are too great. This is an unfortunate, but very common, occurrence.

### Viscosity
> Doing things right is harder than doing things wrong.
>
> Viscosity comes in two forms: viscosity of the software and viscosity of the environment.
>
> When faced with a change, developers usually find more than one way to make that change. Some of the ways preserve the design; others do not (i.e., they are hacks.) When the design-preserving methods are harder to employ than the hacks, the viscosity of the design is high. It is easy to do the wrong thing, but hard to do the right thing. We want to design our software such that the changes that preserve the design are easy to make.

### Needless Complexity(Overdesign)
> The design contains infrastructure that adds no direct benefit.
>
> This frequently happens when developers anticipate changes to the requirements, and put facilities in the software to deal with those potential changes.

### Needless Repetition
> The design contains repeating structures that could be unified under a single abstraction.

### Opacity
> It is hard to read and understand. It does not express its intent well.

## Design Principals

### SRP



## Design Patterns

> A pattern is a reusable solution to a problem that occurs in a particular context.

### Abstract Factory
> Implemented by Composition
>
> A class delegates the responsibility of object instantiation to another object via composition.

### Factory Method 
> Implemented by Inheritance
>
> Uses inheritance and relies on a subclass to handle the desired object instantiation.

### Builder
> The builder pattern is a good choice when designing classes whose constructors or static factories would have more than a handful of parameters.(<b>Telescoping Constructor Pattern</b>)

```csharp
Pizza(int size) { ... }        
Pizza(int size, boolean cheese) { ... }    
Pizza(int size, boolean cheese, boolean pepperoni) { ... }    
Pizza(int size, boolean cheese, boolean pepperoni, boolean bacon) { ... }


Pizza pizza = new Pizza.Builder(12)
                       .cheese(true)
                       .pepperoni(true)
                       .bacon(true)
                       .build();

```
### Composite
> a specialization of the Decorator pattern 
>
> The Composite pattern’s purpose is to allow you to treat many instances of an interface as if they were just one instance.
	Tree

### Adapter
> The Adapter pattern enables much of your code to maintain first-party references to interfaces under your direct control, although in reality using a third-party library. (StopwatchAdapter)
>
> By implementing an adapter for Log4Net, you need not reference it in every assembly.


### Decorator
> The Decorator pattern can be applied whenever some of a class’s functionality needs to be removed but it is too tightly coupled with the intent of the class to stand alone. (Lazy decorators)

### Mediator
> Chat

### Chain of responsibility

### Strategy
> Dependency Injection is a special use of the Strategy Pattern.

### Unit of Work
> The Unit of Work pattern is used to group one or more operations (usually database operations) into a single transaction, or unit of work, so that all operations either pass or fail as one batch.

## Composition over Inheritance.

> Inheritance, which is whitebox reuse, makes the subclass dependent on the implementation of a class, rather than merely on its interface. 
>
> Composition, which is blackbox reuse, limits the dependency to the interface, so that the implementation can vary without adversely affecting clients.


## DDD
> In brief, Evans introduces this concept as a way to decompose a large, complex system into more manageable pieces; a large system is composed of multiple bounded contexts.
>
> Domain {Sphere of knowledge, Problem space, Multiple subdomains}
>
> General subdomain vs Core subdomain
>
> Problem space (Subdomain)   <----> Sulotion space (BoundedContext)
>
> Domain layer contains the infrastructure independent domain logic.
>
> Infrastructure layer provide technology dependent artifacts.
>
> Application layer act as a gateway to business logic with integrated transaction control.
>
> Aggregate ---> Encapsulation
>
> ValueObject ---> Immutable for unwanted side effects.

