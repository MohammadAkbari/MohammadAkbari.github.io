---
title: Elasticsearch
---

## Install
> ./elasticsearch-service.bat install
>
> ./elasticsearch-service.bat start
>
> ./elasticsearch-service.bat remove

## Queries

```
GET my_index/_analyze 
{
  "field": "text",
  "text": "The quick Brown Foxes."
}

```
