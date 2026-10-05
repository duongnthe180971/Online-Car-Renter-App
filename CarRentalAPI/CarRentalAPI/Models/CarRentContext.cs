using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;

namespace CarRentalAPI.Models;

public partial class CarRentContext : DbContext
{
    public CarRentContext()
    {
    }

    public CarRentContext(DbContextOptions<CarRentContext> options)
        : base(options)
    {
    }

    public virtual DbSet<Account> Accounts { get; set; }

    public virtual DbSet<Bill> Bills { get; set; }

    public virtual DbSet<Car> Cars { get; set; }

    public virtual DbSet<CarApprovalLog> CarApprovalLogs { get; set; }

    public virtual DbSet<Feature> Features { get; set; }

    public virtual DbSet<Feedback> Feedbacks { get; set; }

    public virtual DbSet<Garage> Garages { get; set; }

    public virtual DbSet<Notification> Notifications { get; set; }

    public virtual DbSet<NotificationDescription> NotificationDescriptions { get; set; }

    public virtual DbSet<Payment> Payments { get; set; }

    public virtual DbSet<RegisterCar> RegisterCars { get; set; }

    public virtual DbSet<Rental> Rentals { get; set; }

    public virtual DbSet<Voucher> Vouchers { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. You can avoid scaffolding the connection string by using the Name= syntax to read it from configuration - see https://go.microsoft.com/fwlink/?linkid=2131148. For more guidance on storing connection strings, see https://go.microsoft.com/fwlink/?LinkId=723263.
        => optionsBuilder.UseSqlServer("Server=localhost;Database=CarRent;Trusted_Connection=True;TrustServerCertificate=True;");

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Account>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__Account__3213E83F41480B28");

            entity.ToTable("Account");

            entity.HasIndex(e => e.Email, "UQ__Account__A9D10534A2A59C8A").IsUnique();

            entity.HasIndex(e => e.UserName, "UQ__Account__C9F2845602F8A3CC").IsUnique();

            entity.Property(e => e.Id).HasColumnName("id");
            entity.Property(e => e.Address)
                .HasMaxLength(100)
                .IsUnicode(false);
            entity.Property(e => e.Dob).HasColumnName("DOB");
            entity.Property(e => e.Email)
                .HasMaxLength(50)
                .IsUnicode(false);
            entity.Property(e => e.PassWord)
                .HasMaxLength(30)
                .IsUnicode(false);
            entity.Property(e => e.Phone)
                .HasMaxLength(10)
                .IsUnicode(false);
            entity.Property(e => e.Status).HasDefaultValue(true);
            entity.Property(e => e.UserName)
                .HasMaxLength(30)
                .IsUnicode(false);
        });

        modelBuilder.Entity<Bill>(entity =>
        {
            entity.HasKey(e => e.FinanceId).HasName("PK__Bill__7917A8FFA8945CD4");

            entity.ToTable("Bill");

            entity.Property(e => e.FinanceId).HasColumnName("FinanceID");
            entity.Property(e => e.AccId).HasColumnName("AccID");
            entity.Property(e => e.TotalMoney).HasColumnName("totalMoney");

            entity.HasOne(d => d.Acc).WithMany(p => p.Bills)
                .HasForeignKey(d => d.AccId)
                .HasConstraintName("FK__Bill__AccID__74AE54BC");
        });

        modelBuilder.Entity<Car>(entity =>
        {
            entity.HasKey(e => e.CarId).HasName("PK__Car__68A0340E69E8EC71");

            entity.ToTable("Car");

            entity.Property(e => e.CarId).HasColumnName("CarID");
            entity.Property(e => e.Brand)
                .HasMaxLength(50)
                .IsUnicode(false);
            entity.Property(e => e.CarDescription).IsUnicode(false);
            entity.Property(e => e.CarImage).IsUnicode(false);
            entity.Property(e => e.CarName)
                .HasMaxLength(50)
                .IsUnicode(false);
            entity.Property(e => e.CarStatus)
                .HasMaxLength(20)
                .IsUnicode(false);
            entity.Property(e => e.CarType)
                .HasMaxLength(50)
                .IsUnicode(false);
            entity.Property(e => e.Fuel)
                .HasMaxLength(50)
                .IsUnicode(false);
            entity.Property(e => e.GarageId).HasColumnName("GarageID");
            entity.Property(e => e.Gear)
                .HasMaxLength(50)
                .IsUnicode(false);

            entity.HasOne(d => d.Garage).WithMany(p => p.Cars)
                .HasForeignKey(d => d.GarageId)
                .HasConstraintName("FK__Car__GarageID__52593CB8");

            entity.HasMany(d => d.Features).WithMany(p => p.Cars)
                .UsingEntity<Dictionary<string, object>>(
                    "CarFeature",
                    r => r.HasOne<Feature>().WithMany()
                        .HasForeignKey("FeatureId")
                        .OnDelete(DeleteBehavior.ClientSetNull)
                        .HasConstraintName("FK__CarFeatur__Featu__59063A47"),
                    l => l.HasOne<Car>().WithMany()
                        .HasForeignKey("CarId")
                        .OnDelete(DeleteBehavior.ClientSetNull)
                        .HasConstraintName("FK__CarFeatur__CarID__5812160E"),
                    j =>
                    {
                        j.HasKey("CarId", "FeatureId").HasName("PK__CarFeatu__E08204AC12686CC7");
                        j.ToTable("CarFeature");
                        j.IndexerProperty<int>("CarId").HasColumnName("CarID");
                        j.IndexerProperty<int>("FeatureId").HasColumnName("FeatureID");
                    });
        });

        modelBuilder.Entity<CarApprovalLog>(entity =>
        {
            entity.HasKey(e => e.LogId).HasName("PK__CarAppro__5E5499A89C2AEE58");

            entity.ToTable("CarApprovalLog");

            entity.Property(e => e.LogId).HasColumnName("LogID");
            entity.Property(e => e.ActionDate)
                .HasDefaultValueSql("(getdate())")
                .HasColumnType("datetime");
            entity.Property(e => e.ActionType)
                .HasMaxLength(20)
                .IsUnicode(false);
            entity.Property(e => e.AdminId).HasColumnName("AdminID");
            entity.Property(e => e.CarId).HasColumnName("CarID");

            entity.HasOne(d => d.Admin).WithMany(p => p.CarApprovalLogs)
                .HasForeignKey(d => d.AdminId)
                .HasConstraintName("FK__CarApprov__Admin__787EE5A0");

            entity.HasOne(d => d.Car).WithMany(p => p.CarApprovalLogs)
                .HasForeignKey(d => d.CarId)
                .HasConstraintName("FK__CarApprov__CarID__778AC167");
        });

        modelBuilder.Entity<Feature>(entity =>
        {
            entity.HasKey(e => e.FeatureId).HasName("PK__Feature__82230A29AC87E042");

            entity.ToTable("Feature");

            entity.Property(e => e.FeatureId).HasColumnName("FeatureID");
            entity.Property(e => e.Name)
                .HasMaxLength(50)
                .IsUnicode(false);
        });

        modelBuilder.Entity<Feedback>(entity =>
        {
            entity.HasKey(e => e.FeedbackId).HasName("PK__Feedback__6A4BEDF6851582A2");

            entity.ToTable("Feedback");

            entity.Property(e => e.FeedbackId).HasColumnName("FeedbackID");
            entity.Property(e => e.CarId).HasColumnName("CarID");
            entity.Property(e => e.CustomerId).HasColumnName("CustomerID");
            entity.Property(e => e.FeedbackDescription)
                .HasMaxLength(255)
                .IsUnicode(false);

            entity.HasOne(d => d.Car).WithMany(p => p.Feedbacks)
                .HasForeignKey(d => d.CarId)
                .HasConstraintName("FK__Feedback__CarID__628FA481");

            entity.HasOne(d => d.Customer).WithMany(p => p.Feedbacks)
                .HasForeignKey(d => d.CustomerId)
                .HasConstraintName("FK__Feedback__Custom__6383C8BA");
        });

        modelBuilder.Entity<Garage>(entity =>
        {
            entity.HasKey(e => e.GarageId).HasName("PK__Garage__5D8BEEB1BCD37C3D");

            entity.ToTable("Garage");

            entity.Property(e => e.GarageId).HasColumnName("GarageID");
            entity.Property(e => e.CarOwnerId).HasColumnName("CarOwnerID");

            entity.HasOne(d => d.CarOwner).WithMany(p => p.Garages)
                .HasForeignKey(d => d.CarOwnerId)
                .HasConstraintName("FK__Garage__CarOwner__4F7CD00D");
        });

        modelBuilder.Entity<Notification>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__Notifica__3214EC0701521D9A");

            entity.ToTable("Notification");

            entity.Property(e => e.AccId).HasColumnName("AccID");
            entity.Property(e => e.NotificationId).HasColumnName("NotificationID");

            entity.HasOne(d => d.Acc).WithMany(p => p.Notifications)
                .HasForeignKey(d => d.AccId)
                .HasConstraintName("FK__Notificat__AccID__693CA210");

            entity.HasOne(d => d.NotificationNavigation).WithMany(p => p.Notifications)
                .HasForeignKey(d => d.NotificationId)
                .HasConstraintName("FK__Notificat__Notif__6A30C649");
        });

        modelBuilder.Entity<NotificationDescription>(entity =>
        {
            entity.HasKey(e => e.NotificationId).HasName("PK__Notifica__20CF2E328B9A38B5");

            entity.ToTable("NotificationDescription");

            entity.Property(e => e.NotificationId).HasColumnName("NotificationID");
            entity.Property(e => e.Description).IsUnicode(false);
        });

        modelBuilder.Entity<Payment>(entity =>
        {
            entity.HasKey(e => e.PaymentId).HasName("PK__Payment__9B556A585FAAD287");

            entity.ToTable("Payment");

            entity.Property(e => e.PaymentId).HasColumnName("PaymentID");
            entity.Property(e => e.RentalId).HasColumnName("RentalID");

            entity.HasOne(d => d.Rental).WithMany(p => p.Payments)
                .HasForeignKey(d => d.RentalId)
                .HasConstraintName("FK__Payment__RentalI__5FB337D6");
        });

        modelBuilder.Entity<RegisterCar>(entity =>
        {
            entity.HasKey(e => e.CarId).HasName("PK__Register__68A0340EEF388C90");

            entity.ToTable("RegisterCar");

            entity.Property(e => e.CarId).HasColumnName("CarID");
            entity.Property(e => e.Brand)
                .HasMaxLength(50)
                .IsUnicode(false);
            entity.Property(e => e.CarDescription).IsUnicode(false);
            entity.Property(e => e.CarImage).IsUnicode(false);
            entity.Property(e => e.CarName)
                .HasMaxLength(50)
                .IsUnicode(false);
            entity.Property(e => e.CarStatus)
                .HasMaxLength(20)
                .IsUnicode(false);
            entity.Property(e => e.CarType)
                .HasMaxLength(50)
                .IsUnicode(false);
            entity.Property(e => e.Fuel)
                .HasMaxLength(50)
                .IsUnicode(false);
            entity.Property(e => e.GarageId).HasColumnName("GarageID");
            entity.Property(e => e.Gear)
                .HasMaxLength(50)
                .IsUnicode(false);
            entity.Property(e => e.License).IsUnicode(false);

            entity.HasOne(d => d.Garage).WithMany(p => p.RegisterCars)
                .HasForeignKey(d => d.GarageId)
                .HasConstraintName("FK__RegisterC__Garag__6D0D32F4");

            entity.HasMany(d => d.Features).WithMany(p => p.CarsNavigation)
                .UsingEntity<Dictionary<string, object>>(
                    "RegisterCarFeature",
                    r => r.HasOne<Feature>().WithMany()
                        .HasForeignKey("FeatureId")
                        .OnDelete(DeleteBehavior.ClientSetNull)
                        .HasConstraintName("FK__RegisterC__Featu__71D1E811"),
                    l => l.HasOne<RegisterCar>().WithMany()
                        .HasForeignKey("CarId")
                        .OnDelete(DeleteBehavior.ClientSetNull)
                        .HasConstraintName("FK__RegisterC__CarID__70DDC3D8"),
                    j =>
                    {
                        j.HasKey("CarId", "FeatureId").HasName("PK__Register__E08204ACCF13F463");
                        j.ToTable("RegisterCarFeature");
                        j.IndexerProperty<int>("CarId").HasColumnName("CarID");
                        j.IndexerProperty<int>("FeatureId").HasColumnName("FeatureID");
                    });
        });

        modelBuilder.Entity<Rental>(entity =>
        {
            entity.HasKey(e => e.RentalId).HasName("PK__Rental__9700596319B91BD5");

            entity.ToTable("Rental");

            entity.Property(e => e.RentalId).HasColumnName("RentalID");
            entity.Property(e => e.CarId).HasColumnName("CarID");
            entity.Property(e => e.CustomerId).HasColumnName("CustomerID");

            entity.HasOne(d => d.Car).WithMany(p => p.Rentals)
                .HasForeignKey(d => d.CarId)
                .HasConstraintName("FK__Rental__CarID__5BE2A6F2");

            entity.HasOne(d => d.Customer).WithMany(p => p.Rentals)
                .HasForeignKey(d => d.CustomerId)
                .HasConstraintName("FK__Rental__Customer__5CD6CB2B");
        });

        modelBuilder.Entity<Voucher>(entity =>
        {
            entity.HasKey(e => e.VoucherId).HasName("PK__Voucher__3AEE79C139C87255");

            entity.ToTable("Voucher");

            entity.HasIndex(e => e.VoucherCode, "UQ__Voucher__7F0ABCA95E060123").IsUnique();

            entity.Property(e => e.VoucherId).HasColumnName("VoucherID");
            entity.Property(e => e.DiscountAmount).HasColumnType("decimal(10, 2)");
            entity.Property(e => e.Image)
                .IsUnicode(false)
                .HasColumnName("image");
            entity.Property(e => e.IsClaimed).HasDefaultValue(false);
            entity.Property(e => e.VoucherCode)
                .HasMaxLength(50)
                .IsUnicode(false);

            entity.HasOne(d => d.ClaimedByNavigation).WithMany(p => p.Vouchers)
                .HasForeignKey(d => d.ClaimedBy)
                .HasConstraintName("FK__Voucher__Claimed__7E37BEF6");
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
