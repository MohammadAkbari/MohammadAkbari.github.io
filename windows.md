---
title: Windows
---

## Install Telnet
```
dism /online /Enable-Feature /FeatureName:TelnetClient
```

## cURL
```
curl --head -X GET https://example.com/ --resolve example.com:443:192.168.1.1

curl -H "Content-Type: application/x-www-form-urlencoded" \
-H "token: XYZ" \ 
-X POST \
-d "name=value" \
https://example.com/

curl -D - -o /dev/null https://github.com --max-time 15
```

## Find process by port
```
netstat -aon | findstr /i "listening" | findstr "8080"
netstat -ano | findStr "8080"

tasklist /fi "pid eq 2216"
```

## Tail
```
Get-Content -path 'PATH_TO_FILE' -Tail 2 -Wait
```
