---
title: Containerization
---
## Container
> A container is an operating system-level virtualization method that supports running isolated systems on a host, each with its own network and process space, sharing the same kernel. A container is quicker to build and quicker to start up than a virtual machine (seconds, rather than minutes)

## Volumes
> At a high-level, you create a volume, then you create a container, and you mount the volume into it. The volume gets mounted to a directory in the container’s filesystem, and anything written to that directory is written to the volume. If you then delete the container, the volume and its data will still exist.

## Kubectl Deployment

![images/kubectl_deployment](images/kubectl_deployment.jpg){: .center-image }

## Docker
> In short, containers are running systems defined by images. These images are made up of one or more layers (or sets of diffs) plus some metadata for Docker.

### docker run
```
docker run --name [container-name] -p [8080:80] -d [docker-image:tag]
```
### bash into a running container: 
```
docker exec -it dca6c76bd4e0 /bin/bash
```
### inspect
```
docker image inspect web:latest
docker image history web:latest
```
### Run container
```
docker build git://github.com/MohammadAkbari/kubesail.git#master:Client1 [--nocache=true]
```
### nano
```
RUN apt-get update && apt-get install -y nano --no-install-recommends apt-utils
```
### [administrative privileges to docker](https://linuxconfig.org/how-to-install-docker-on-ubuntu-20-04-lts-focal-fossa)
```bash
sudo usermod -aG docker SOMEUSERNAME
```

### [docker container top](https://docs.docker.com/engine/reference/commandline/container_top/)
```
docker container top CONTAINER [ps OPTIONS]

docker container logs

docker logs -f --tail -n=20 CONTAINER
```

## Kubernetes
### kubeadm
```
kubeadm token create --print-join-command
sudo kubeadm reset
```
### bash into a running pod
```
kubectl exec -it <POD NAME> -- /bin/bash
kubectl exec ${POD_NAME} -c ${CONTAINER_NAME} -- ${CMD} ${ARG1} ${ARG2} ... ${ARGN}
```
### Apis
```
kubectl get endpoints
```
```
kubectl rollout <restart, status, undo> deployment sample-dep
```
```
kubectl config view --raw -o json
```

## DevOps

> Deployment is a combination of two interrelated concepts: process and architecture.
>
> The adoption of DevOps means that the development team is also responsible for deploying their application or services.
>
> In some organizations, operations provides developers with a console for deploying their code. Or, better yet, once the tests pass, the deployment pipeline automatically deploys the code into production.

> If you want to deploy microservices at scale, you need a highly automated deployment process and infrastructure.

## [Dockerfile .Net core](https://docs.docker.com/samples/dotnetcore/)
```
FROM mcr.microsoft.com/dotnet/core/aspnet:3.1-buster-slim AS base
#WORKDIR /app
EXPOSE 80
EXPOSE 443

FROM mcr.microsoft.com/dotnet/core/sdk:3.1-buster AS build
WORKDIR /src
COPY ["Api1.csproj", "./"]
RUN dotnet restore "Api1.csproj"
COPY . .
#RUN dotnet build "Api1.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "Api1.csproj" -c Release -o /app/publish

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .

ENTRYPOINT ["dotnet", "Api1.dll"]
```
### .dockerignore
```
# directories
**/bin/
**/obj/
**/out/

# files
Dockerfile*
**/*.md
```
### VMware and Docker Conflict
```
bcdedit /set hypervisorlaunchtype off
bcdedit /set hypervisorlaunchtype auto
```
