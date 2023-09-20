> Channel ==> Logical Connection

> rabbitmqctl sync_queue  

> rabbitmqctl list_queues | awk '$1 ~ /xyz/ { print $1 }' | xargs -L1 rabbitmqctl delete_queue

> rabbitmqctl set_vm_memory_high_watermark absolute "3G"
