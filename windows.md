## Install Telnet
```
dism /online /Enable-Feature /FeatureName:TelnetClient
```

## cURL

```
curl --head -X GET https://example.com/ --resolve example.com:443:192.168.1.1
```
