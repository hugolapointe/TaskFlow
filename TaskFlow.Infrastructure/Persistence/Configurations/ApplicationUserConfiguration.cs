namespace TaskFlow.Infrastructure.Persistence.Configurations;

using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

using TaskFlow.Domain.Users;

public class ApplicationUserConfiguration : IEntityTypeConfiguration<ApplicationUser> {

    public void Configure(EntityTypeBuilder<ApplicationUser> builder) {

        builder.Property(u => u.Name)
            .IsRequired()
            .HasMaxLength(100);

        builder.Property(u => u.IsArchived)
            .HasDefaultValue(false);
    }
}
