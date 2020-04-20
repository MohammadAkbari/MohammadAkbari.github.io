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

###  NEST
``` C#
var raw = "{\"query\":{}}";

var stringResponse = await _elasticLowLevelClient.DoRequestAsync<StringResponse>(
		Elasticsearch.Net.HttpMethod.POST,
		"_search",
		CancellationToken.None,
		PostData.String(raw));

var t = JsonSerializer.Deserialize<>(stringResponse.Body);
```
