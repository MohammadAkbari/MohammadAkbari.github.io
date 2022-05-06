---
title: gRPC
---

> Marshaling is the process of packing parameters and a remote function into a message packet that is sent over the network, 
while unmarshaling unpacks the message packet into the respective method invocation.

> REST is the foundation of the resource-oriented architecture (ROA)
	- Inefficient text-based message protocols
	- Lacks strongly typed interfaces between apps
	- REST architectural style is hard to enforce

> ./grpcurl -d '{"name": "world"}' example.com:443 /greet.Greeter/SayHello

> language-agnostic: language-independent

> protocol buffers as a data serialization mechanism
