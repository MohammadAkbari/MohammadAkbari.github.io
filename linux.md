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
chrome://net-internals/#hsts

## Firefox
about:config
security.mixed_content.block_active_content

## Repeat command
```
while true; do curl 0.0.0.0:8090 ; sleep 5; done
```
## Nginx
```
nginx -s reload
service haproxy restart
systemctl restart nginx
```
