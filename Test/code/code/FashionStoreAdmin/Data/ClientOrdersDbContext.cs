using FashionStoreAdmin.Models;
using Microsoft.EntityFrameworkCore;

namespace FashionStoreAdmin.Data;

public class ClientOrdersDbContext : DbContext
{
    public ClientOrdersDbContext(DbContextOptions<ClientOrdersDbContext> options)
        : base(options)
    {
    }

    public DbSet<ClientOrder> Orders => Set<ClientOrder>();
    public DbSet<ClientOrderDetail> OrderDetails => Set<ClientOrderDetail>();

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<ClientOrder>(entity =>
        {
            entity.ToTable("Order"); // Requirement table name
            entity.HasKey(x => x.Id);

            entity.Property(x => x.CustomerName).HasMaxLength(200);
            entity.Property(x => x.Phone).HasMaxLength(30);
            entity.Property(x => x.Address).HasMaxLength(400);

            entity.Property(x => x.TotalAmount).HasColumnType("decimal(18,2)");
            entity.Property(x => x.PaymentMethod).HasMaxLength(10);
            entity.Property(x => x.Status).HasMaxLength(50);

            entity.Property(x => x.CreatedAt);

            entity.HasMany(x => x.OrderDetails)
                .WithOne(x => x.Order)
                .HasForeignKey(x => x.OrderId)
                .OnDelete(DeleteBehavior.Cascade);
        });

        modelBuilder.Entity<ClientOrderDetail>(entity =>
        {
            entity.ToTable("OrderDetail"); // Requirement table name
            entity.HasKey(x => x.Id);

            entity.Property(x => x.Price).HasColumnType("decimal(18,2)");
        });
    }
}

