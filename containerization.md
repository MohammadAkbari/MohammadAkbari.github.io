---
title: Containerization
---

![images/kubectl_deployment](images/kubectl_deployment.jpg){: .center-image }

## Docker
> In short, containers are running systems defined by images. These images are made up of one or more layers (or sets of diffs) plus some metadata for Docker.

### Commands

> bash into a running container: 
```
docker exec -i -t dca6c76bd4e0 /bin/bash
```

> Run container
```
docker run --name kubia-container -p 8080:8080 -d kubia
```


## Kubernetes

### Commands
```
kubeadm token create --print-join-command
```
```
kubectl exec ${POD_NAME} -c ${CONTAINER_NAME} -- ${CMD} ${ARG1} ${ARG2} ... ${ARGN}
```
```
kubectl get endpoints
```

## Linux

### SSH
```
sudo apt install openssh-server
sudo systemctl status ssh
```
