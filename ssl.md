---
title: SSL
---

## Generate pfx
```
openssl pkcs12 -export -out bundle.pfx -inkey privkey.pem -in cert.pem -certfile chain.pem
```

## Generate pem
```
cp privkey.pem fullcertchain.pem && cat fullchain.pem >> bundle.pem
```

## Links
```
[Lets Encrypt: Manually get a certificate on Windows for an Azure App Service](https://rajbos.github.io/blog/2019/08/27/LetsEncrypt-Windows)
```