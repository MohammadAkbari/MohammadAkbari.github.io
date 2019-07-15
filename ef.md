---
title: EntityFramework
---

```
public class ApplicationDbContext : DbContext
{
    string _connection = "Data Source=.;Initial Catalog=App;Integrated Security=true;";
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

```
