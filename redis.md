---
title: Redis
---

## SELECT DB
```
SELECT 1
```

## KEYS Count
```
EVAL "return #redis.pcall('KEYS','ads:*')" 0
```

## SMEMBERS Count
```
SCARD key
```
