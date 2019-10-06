---
title: Sql Server
---
## Number of Connections
```sql
SELECT 
    DB_NAME(dbid) as DBName, 
    COUNT(dbid) as NumberOfConnections,
    loginame as LoginName
FROM
    sys.sysprocesses
WHERE 
    dbid > 0
GROUP BY 
    dbid, loginame
```

## Top queries consuming High CPU [refrence](https://blogs.msdn.microsoft.com/docast/2017/07/30/sql-high-cpu-troubleshooting-checklist/)
```sql
SELECT
  s.session_id,
  r.status,
  r.blocking_session_id 'Blk by',
  r.wait_type,
  r.wait_resource,
  r.wait_time / (1000 * 60) 'Wait M',
  r.cpu_time,
  r.logical_reads,
  r.reads,
  r.writes,
  r.total_elapsed_time / (1000 * 60) 'Elaps M',
  SUBSTRING(st.TEXT, (r.statement_start_offset / 2) + 1,
  ((CASE r.statement_end_offset
    WHEN -1 THEN DATALENGTH(st.TEXT)
    ELSE r.statement_end_offset
  END - r.statement_start_offset) / 2) + 1) AS statement_text,
  COALESCE(QUOTENAME(DB_NAME(st.dbid)) + N'.' 
    + QUOTENAME(OBJECT_SCHEMA_NAME(st.objectid, st.dbid)) + N'.' 
    + QUOTENAME(OBJECT_NAME(st.objectid, st.dbid)), '') AS command_text,
  r.command,
  s.login_name,
  s.host_name,
  s.program_name,
  s.last_request_end_time,
  s.login_time,
  r.open_transaction_count
FROM sys.dm_exec_sessions AS s
JOIN sys.dm_exec_requests AS r
  ON r.session_id = s.session_id
CROSS APPLY sys.Dm_exec_sql_text(r.sql_handle) AS st
WHERE r.session_id != @@SPID
ORDER BY r.cpu_time DESC
```
##  Check/Change Isolation Level
```sql
DBCC USEROPTIONS

ALTER DATABASE [DB_NAME] SET SINGLE_USER WITH ROLLBACK [IMMEDIATE|AFTER 30 SECONDS]
ALTER DATABASE [DB_NAME] SET READ_COMMITTED_SNAPSHOT ON
ALTER DATABASE [DB_NAME] SET MULTI_USER
```
