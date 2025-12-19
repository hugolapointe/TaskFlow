namespace TaskFlow.Infrastructure.Persistence;

using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

using TaskFlow.Application.Common.Interfaces;
using TaskFlow.Domain.Tasks;
using TaskFlow.Domain.Users;

public class ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
    : IdentityDbContext<ApplicationUser, IdentityRole<Guid>, Guid>(options), IUnitOfWork {

    public DbSet<TaskAggregate> Tasks { get; init; }

    public override async Task<int> SaveChangesAsync(CancellationToken cancellationToken = new CancellationToken()) {
        return await base.SaveChangesAsync(cancellationToken);
    }

    protected override void OnModelCreating(ModelBuilder builder) {
        base.OnModelCreating(builder);
        builder.ApplyConfigurationsFromAssembly(typeof(ApplicationDbContext).Assembly);
    }
}
