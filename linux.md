---
title: Linux
---
## SSH
```
sudo apt install openssh-server
sudo systemctl status ssh
```
### Disable SWAP
```
sudo swapon -s
sudo swapoff -a
```

## Missing network connection
```
sudo touch /etc/NetworkManager/conf.d/10-globally-managed-devices.conf
sudo systemctl restart NetworkManager

sudo nmcli networking on
```
## Can't start GUI
```
sudo apt install lightdm  
sudo dpkg-reconfigure lightdm   
sudo reboot
```

## Firewall

```
sudo ufw allow from any to any port 10000 proto tcp
```

## Copy folder
```
cp -a /source/. /dest/
```

## Other
```
sudo chown k-master:k-master /var/www/web1
```
```
sudo visudo
```
## Log request
```
sudo tcpdump -ni any port 80 -vv -s0 -w http.pcap
```
## Chrome
[a link](chrome://net-internals/#hsts)
[arbitrary case-insensitive reference text]: https://www.mozilla.org
