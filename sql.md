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

## Progress of a SQL Server backup or restore process?
```sql
SELECT 
   r.session_id
 , r.command
 , CONVERT(NUMERIC(6,2), r.percent_complete) AS [Percent Complete]
 , CONVERT(VARCHAR(20), DATEADD(ms,r.estimated_completion_time,GetDate()),20) AS [ETA Completion Time]
 , CONVERT(NUMERIC(10,2), r.total_elapsed_time/1000.0/60.0) AS [Elapsed Min]
 , CONVERT(NUMERIC(10,2), r.estimated_completion_time/1000.0/60.0) AS [ETA Min]
 , CONVERT(NUMERIC(10,2), r.estimated_completion_time/1000.0/60.0/60.0) AS [ETA Hours]
 , CONVERT(VARCHAR(1000), 
      (SELECT SUBSTRING(text,r.statement_start_offset/2, CASE WHEN r.statement_end_offset = -1 
                                                             THEN 1000 
                                                             ELSE (r.statement_end_offset-r.statement_start_offset)/2 
                                                        END)
        FROM sys.dm_exec_sql_text(sql_handle)
       )
   ) AS [SQL]
  FROM sys.dm_exec_requests r 
 WHERE command IN ('RESTORE DATABASE', 'BACKUP DATABASE')
```

## Kill all database connections
```sql
USE [master];

DECLARE @kill varchar(8000) = '';  
SELECT @kill = @kill + 'kill ' + CONVERT(varchar(5), session_id) + ';'  
FROM sys.dm_exec_sessions
WHERE database_id  = db_id('MyDB')

EXEC(@kill);
```

## Exclusive access could not be obtained because the database is in use [refrence](https://stackoverflow.com/questions/22209499/sql-server-error-exclusive-access-could-not-be-obtained-because-the-database)
```sql
USE master;
GO
ALTER DATABASE AdventureWorks
SET SINGLE_USER
WITH ROLLBACK IMMEDIATE;

RESTORE DATABASE AdventureWorks
  FROM DISK = 'PATH\TO\AdventureWorks.bak'
  WITH REPLACE,
  MOVE 'AdventureWorks' TO 'PATH\TO\AdventureWorks.mdf',
  MOVE 'AdventureWorks_log' TO 'PATH\TO\AdventureWorks_log.ldf';

ALTER DATABASE AdventureWorks
SET MULTI_USER;
GO

SELECT request_session_id FROM sys.dm_tran_locks 
WHERE resource_database_id = DB_ID('AdventureWorks')

exec sp_who

KILL 87
```
```sql

USE MASTER;

ALTER DATABASE [DatabaseName] SET OFFLINE
ALTER DATABASE [DatabaseName] SET ONLINE 

-- Add users
ALTER DATABASE [DatabaseName] SET MULTI_USER
GO
```
## Database Files Location
```sql
EXEC sp_helpdb 'Database'
```
### Auto_Fix
```sql
USE Database
EXEC sp_change_users_login 'Auto_Fix', 'UserName'
```

##  Check Isolation Level
```sql
SELECT session_id, start_time, status,
total_elapsed_time,
CASE transaction_isolation_level
WHEN 1 THEN 'ReadUncomitted'
WHEN 2 THEN 'ReadCommitted'
WHEN 3 THEN 'Repeatable'
WHEN 4 THEN 'Serializable'
WHEN 5 THEN 'Snapshot'
ELSE 'Unspecified' END AS transaction_isolation_level,
sh.text, ph.query_plan
FROM sys.dm_exec_requests
CROSS APPLY sys.dm_exec_sql_text(sql_handle) sh
CROSS APPLY sys.dm_exec_query_plan(plan_handle) ph
```

```sql
SELECT is_read_committed_snapshot_on FROM sys.databases 
WHERE name= 'DB NAME'
```

##  Change Isolation Level
```sql
DBCC USEROPTIONS

ALTER DATABASE [DB_NAME] SET SINGLE_USER WITH ROLLBACK [IMMEDIATE|AFTER 30 SECONDS]
ALTER DATABASE [DB_NAME] SET READ_COMMITTED_SNAPSHOT ON
ALTER DATABASE [DB_NAME] SET MULTI_USER
```

## Table Variable
```sql
DECLARE @PhoneNumbers table (PhoneNumber NVARCHAR(15))

INSERT INTO @PhoneNumbers VALUES
('1'),
('2'),
('3')
```

## CSV to Temp Table
```sql
CREATE TABLE #Sample(Id BIGINT)

BULK INSERT #Sample
FROM 'C:\sample.csv'
WITH
(
	FIRSTROW = 2
)

SELECT * FROM #Sample
```

## TempDB

> The tempdb system database is a global resource that is available to all users connected to the instance of SQL Server and is used to hold the following:
>
> * Temporary user objects that are explicitly created, such as: global or local temporary tables, temporary stored procedures, table variables, or cursors.
> * Internal objects that are created by the SQL Server Database Engine, for example, work tables to store intermediate results for spools or sorting.
> * Row versions that are generated by data modification transactions in a database that uses read-committed using row versioning isolation or snapshot isolation transactions.
> * Row versions that are generated by data modification transactions for features, such as: online index operations, Multiple Active Result Sets (MARS), and AFTER triggers.
>
> Operations within tempdb are minimally logged. This enables transactions to be rolled back. tempdb is re-created every time SQL Server is started so that the system always starts with a clean copy of the database. Temporary tables and stored procedures are dropped automatically on disconnect, and no connections are active when the system is shut down. Therefore, there is never anything in tempdb to be saved from one session of SQL Server to another. Backup and restore operations are not allowed on tempdb.
>
> So for the vast majority of implementations, leaving tempdb where it is with all the default settings is fine.  But with databases that have stored procs or other code creating lots of temporary variables, cursors, and so forth, need to put tempdb on its own disk and treat it more like the transaction log.

## Cursor
```sql
DECLARE @Id BIGINT
DECLARE @Title NVARCHAR(50)

DECLARE cur CURSOR FOR SELECT Id, Title FROM dbo.Category

OPEN cur

FETCH NEXT FROM cur INTO @Id, @Title

WHILE @@FETCH_STATUS = 0 BEGIN
 
	PRINT CAST(@Id AS NVARCHAR(10))+ '...' + @Title
	FETCH NEXT FROM cur INTO @Id, @Title
END

CLOSE cur    
DEALLOCATE cur
```
## Delete large
```sql
WHILE (1=1)
BEGIN
    DELETE TOP(1000) FROM ForumPost
    IF @@ROWCOUNT < 1 BREAK
END
```
## Check is null or empty
```sql
Select *
From Table
Where IsNull(col, '') = ''
```
## sqlcmd
```
start sqlcmd -S "" -d "" -U "" -P "" -i query.sql
WAITFOR DELAY '00:00:05'
GO 20
```

## Index Physical Stats
```sql
EXEC sys.sp_helpindex @objname = N'dbo.Table'

SELECT OBJECT_NAME(i.object_id),
	i.index_id,
	i.name,
	i.type_desc
FROM sys.indexes AS i
WHERE i.object_id = OBJECT_ID(N'dbo.Table')

SELECT index_depth,
	index_level,
	record_count,
	page_count,
	avg_page_space_used_in_percent,
	min_record_size_in_bytes,
	max_record_size_in_bytes,
	avg_record_size_in_bytes
FROM sys.dm_db_index_physical_stats
	(DB_ID(N'Database'),
	OBJECT_ID(N'Database.dbo.Table'),
	1,
	NULL,
	'DETAILED')
```
### News that have multiple tags
```sql
SELECT NewsId FROM NewsTags
GROUP BY NewsId
HAVING SUM(CASE WHEN TagId = 1 THEN 1 ELSE 0 END) > 0 
AND    SUM(CASE WHEN TagId = 2 THEN 1 ELSE 0 END) > 0 
```

