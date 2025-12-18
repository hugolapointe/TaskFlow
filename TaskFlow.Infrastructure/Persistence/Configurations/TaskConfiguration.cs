namespace TaskFlow.Infrastructure.Persistence.Configurations;

using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using TaskFlow.Domain.Tasks;

public class TaskConfiguration : IEntityTypeConfiguration<TaskAggregate>
{
    public void Configure(EntityTypeBuilder<TaskAggregate> builder)
    {
        builder.HasKey(t => t.Id);

        builder.Property(t => t.Title)
            .IsRequired()
            .HasMaxLength(200);

        builder.Property(t => t.Description)
            .HasMaxLength(1000);

        builder.Property(t => t.Status)
            .IsRequired()
            .HasConversion<string>(); // Store enum as string

        builder.Property(t => t.Importance)
            .IsRequired()
            .HasConversion<string>(); // Store enum as string

        builder.Property(t => t.OwnerId)
            .IsRequired();

        // Configure Tags as a value object owned by TaskAggregate
        builder.OwnsMany(t => t.Tags, tagBuilder =>
        {
            tagBuilder.WithOwner().HasForeignKey("TaskId"); // Foreign key back to TaskAggregate
            tagBuilder.Property(t => t.Value)
                .HasMaxLength(50)
                .IsRequired();
            tagBuilder.HasKey("Id"); // Primary key for the owned entity
            tagBuilder.ToTable("TaskTags"); // Table name for tags
        });

        builder.Property(t => t.IsArchived)
            .HasDefaultValue(false);

        // Audit properties
        builder.Property(t => t.CreatedAt)
            .IsRequired();

        builder.Property(t => t.CreatedBy)
            .IsRequired();

        builder.Property(t => t.LastModifiedAt);

        builder.Property(t => t.LastModifiedBy);
    }
}
