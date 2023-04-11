> Channel ==> Logical Connection

> rabbitmqctl sync_queue  

> rabbitmqctl list_queues | awk '$1 ~ /xyz/ { print $1 }' | xargs -L1 rabbitmqctl delete_queue
