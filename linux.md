---
title: Linux
---
## SSH
```
sudo apt install openssh-server
sudo systemctl status ssh
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
