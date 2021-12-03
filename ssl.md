---
title: SSL
---

## Generate ssl
```
certbot certonly --manual --preferred-challenges=dns --agree-tos -d *.example.com
```

## Generate pfx
```
openssl pkcs12 -export -out bundle.pfx -inkey privkey.pem -in cert.pem -certfile chain.pem

sudo chmod a+rwx bundle.pfx
```

## Generate pem
```
cp privkey.pem fullcertchain.pem && cat fullchain.pem >> bundle.pem
```

## Links

[Lets Encrypt: Manually get a certificate on Windows for an Azure App Service](https://rajbos.github.io/blog/2019/08/27/LetsEncrypt-Windows)
