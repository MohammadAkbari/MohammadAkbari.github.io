---
title: Linux
---
### Remove Key in Nginx
```
ls $(grep -R 'pattern' /path/to/cache/ | awk '{print $3}')
rm $(grep -R 'pattern' /path/to/cache/ | awk '{print $3}')
grep -R 'pattern' /path/to/cache/ | awk '{print $1}' | xargs -I % rm %

```

### Disable SWAP
```
sudo swapon -s
sudo swapoff -a
```
## To check the listening ports and applications on Linux
```
lsof -i -P -n | grep LISTEN
```

## The sockstat command lists open Internet or UNIX domain sockets. [Detail](http://manpages.ubuntu.com/manpages/groovy/man1/sockstat.1.html)
```
sockstat - list open sockets
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

sudo tcpdump -ni eth0 host 192.168.42.1
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
## LXC
```
networkctl status -a
```
```yaml
network:
  version: 2
  renderer: networkd
  ethernets:
    ens33:
      dhcp4: no
      dhcp6: no
  bridges:
    br0:
      interfaces: [ens33]
      addresses: [192.168.42.142/24]
      gateway4: 192.168.42.2
      mtu: 1500
      nameservers:
        addresses: [192.168.42.2]
      parameters:
        stp: true
        forward-delay: 4
```
```
lxc launch ubuntu:18.04 container1
lxc list
lxc config device add container1 eth0 nic nictype=bridged parent=br0 name=eth0
lxc exec container1  -- sudo /bin/bash
```
## iptables
### Save and Restore
```
iptables-save > /etc/iptables/rules.txt
iptables-restore < /etc/iptables/rules.txt
```
### Delete rule
```
iptables -L --line-number
iptables -D INPUT {line}
```
### Some rules
```
iptables -A INPUT -p tcp -m tcp --dport 8080 -s 192.168.42.1 -j ACCEPT
iptables -A INPUT -p tcp -m tcp -m multiport ! --dports 80,443,22 -j DROP
```
### Insert with priority
```
iptables -I INPUT {line} -i lo -p tcp --dport {port} -j ACCEPT -m comment --comment "This rule is here for this reason"
```

## HAProxy
```
http-response set-header X-Server %s

http-request set-var(txn.my_host) req.hdr(host),lower
http-response add-header X-Target %[var(txn.my_host)]
```

### HAProxy config check
```
haproxy -f /etc/haproxy/haproxy.cfg -c
```

### HAProxy http-request test
```
http-request return content-type image/jpeg file /PATH/TO/image.jpg if { path /image.jpg }
```
### Whitelist
``` 
acl network_allowed src -f /etc/haproxy/whitelist.lst
acl restricted_domain  hdr(host) -i  example.com
http-request deny if restricted_domain  !network_allowed
```

## Http
```
telnet www.stackoverflow.com 443
GET /questions HTTP/1.0
Host: stackoverflow.com
Connection: Keep-Alive
```
```
openssl s_client -crlf -connect www.stackoverflow.com:443 -quiet
GET /questions HTTP/1.0
Host: stackoverflow.com
Connection: Keep-Alive
```
```
curl -vso /dev/null --http2 https://stackoverflow.com/
```
```
nghttp -v https://stackoverflow.com/
```

## scp
```
scp sheep.txt root@10.0.3.14:/root/workspace
```

## crontab
```bash
crontab -e
 */1 * * * * date >> /home/mohammad/socket.log
 */1 * * * * ss | grep :5601 | wc -l >> /home/mohammad/socket.log
```

## nginx debug
```
server {
    listen 80;
    server_name example.com;

    location / {
        default_type text/html;
        return 200 "<!DOCTYPE html><h2>gangnam style!</h2>\n";
    }
}

```
