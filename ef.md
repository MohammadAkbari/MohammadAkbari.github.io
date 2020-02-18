---
title: EntityFramework
---

```
public class ApplicationDbContext : DbContext
{
    string _connection = "Data Source=.;Initial Catalog=App;Integrated Security=true;Application Name=MyApplication";
    public DbSet<User> Users { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    {
        if (!optionsBuilder.IsConfigured)
        {
            optionsBuilder.UseSqlServer(_connection);
        }
    }

    protected override void OnModelCreating(ModelBuilder builder)
    {
        builder.ApplyConfiguration(new UserConfiguration());

        base.OnModelCreating(builder);
    }
}

public class UserConfiguration : IEntityTypeConfiguration<User>
{
    public void Configure(EntityTypeBuilder<User> builder)
    {
        builder.HasQueryFilter(e => !e.IsDeleted);
    }
}

```

```

services.AddDbContextPool<NorthwindContext>(options =>options
        .UseSqlServer(Configuration.GetConnectionString("Default"))
        .ConfigureWarnings(x => x.Throw(RelationalEventId.QueryPossibleUnintendedUseOfEqualsWarning))
        .EnableSensitiveDataLogging(_environment.IsDevelopment())
        .UseQueryTrackingBehavior(QueryTrackingBehavior.NoTracking));

```
```
var connectionString = ctx.Database.GetDbConnection().ConnectionString;
```
