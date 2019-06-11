# Design

<div class="jumbotron">
    <h1>Code Smell (Design Smells)</h1>
    <div class="alert alert-warning" role="alert">
        Agile teams apply principles to remove smells. They don’t apply principles when there are no smells. It is a
        mistake to unconditionally conform to a principle just because it is a principle. Principles are not a perfume
        to be liberally scattered all over the system. Overconformance to the principles leads to the design smell
        of Needless Complexity.
    </div>
    <div class="alert alert-success" role="alert">
        <h4 class="alert-heading">Rigidity</h4>
        <hr>
        <p>The system is hard to change because every change forces many other changes to other parts of the system.</p>
        <p>A design is rigid if a single change causes a cascade of subsequent changes in dependent modules.</p>
        <p>The smell of Rigidity is often a result of insufficient attention to The Open–Closed Principle (OCP).</p>
    </div>
    <div class="alert alert-success" role="alert">
        <h4 class="alert-heading">Fragility</h4>
        <hr>
        <p>The design is easy to break.</p>
        <p>Changes cause the system to break in places that have no conceptual relationship to the part that was changed.</p>
    </div>
    <div class="alert alert-success" role="alert">
        <h4 class="alert-heading">Immobility</h4>
        <hr>
        <p>The design is hard to reuse.</p>
        <p>It is hard to disentangle the system into components that can be reused in other systems.</p>
        <p>A design is immobile when it contains parts that could be useful in other systems, but the
            effort and risk involved with separating those parts from the original system are too great. This is an unfortunate,
            but very common, occurrence.</p>
    </div>
    <div class="alert alert-success" role="alert">
        <h4 class="alert-heading">Viscosity</h4>
        <hr>
        <p>Doing things right is harder than doing things wrong.</p>
        <p>Viscosity comes in two forms: viscosity of the software and viscosity of the environment.</p>
        <p>When faced with a change, developers usually find more than one way to make that change. Some of the
            ways preserve the design; others do not (i.e., they are hacks.) When the design-preserving methods are harder to
            employ than the hacks, the viscosity of the design is high. It is easy to do the wrong thing, but hard to do the right
            thing. We want to design our software such that the changes that preserve the design are easy to make.</p>
    </div>
    <div class="alert alert-success" role="alert">
        <h4 class="alert-heading">Needless Complexity(Overdesign)</h4>
        <hr>
        <p>The design contains infrastructure that adds no direct benefit.</p>
        <p>This frequently happens when developers anticipate changes to the requirements, and put facilities in
            the software to deal with those potential changes.</p>
    </div>
    <div class="alert alert-success" role="alert">
        <h4 class="alert-heading">Needless Repetition</h4>
        <hr>
        <p>The design contains repeating structures that could be unified under a single abstraction.</p>
    </div>
    <div class="alert alert-success" role="alert">
        <h4 class="alert-heading">Opacity</h4>
        <hr>
        <p>It is hard to read and understand. It does not express its intent well.</p>
    </div>
</div>