namespace TaskFlow.Infrastructure.Persistence.Configurations;

using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using TaskFlow.Domain.Tasks;
using TaskFlow.Domain.Users;

public class TaskConfiguration : IEntityTypeConfiguration<TaskAggregate>
{
    public void Configure(EntityTypeBuilder<TaskAggregate> builder)
    {
        builder.HasKey(t => t.Id);

        builder.Property(t => t.Description)
            .IsRequired()
            .HasMaxLength(1000);

        builder.Property(t => t.Status)
            .IsRequired()
            .HasConversion<string>();

        builder.Property(t => t.Importance)
            .IsRequired()
            .HasConversion<string>();

        builder.Property(t => t.DueDate);

        builder.Property(t => t.ScheduledAt);

        builder.Property(t => t.CompletedAt);

        // Foreign key relationship with ApplicationUser
        builder.HasOne<ApplicationUser>()
            .WithMany()
            .HasForeignKey(t => t.OwnerId)
            .IsRequired()
            .OnDelete(DeleteBehavior.Restrict);

        // Configure Tags as a value object owned by TaskAggregate
        builder.OwnsMany<Tag>(t => t.Tags, tagBuilder =>
        {
            tagBuilder.WithOwner().HasForeignKey("TaskId");
            tagBuilder.Property(t => t.Name)
                .HasMaxLength(50)
                .IsRequired();
            tagBuilder.HasKey("Id");
            tagBuilder.ToTable("TaskTags");
        });

        builder.Property(t => t.IsArchived)
            .HasDefaultValue(false);

        // Audit properties
        builder.Property(t => t.CreatedAt)
            .IsRequired();

        builder.Property(t => t.CreatedBy)
            .IsRequired();

        builder.Property(t => t.LastUpdatedAt);

        builder.Property(t => t.LastUpdatedBy);

        // Ignore domain events - they are not persisted
        builder.Ignore(t => t.Events);
    }
}
