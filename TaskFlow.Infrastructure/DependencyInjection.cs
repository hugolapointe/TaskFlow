namespace TaskFlow.Infrastructure;

using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

using TaskFlow.Application.Common.Interfaces;
using TaskFlow.Domain.Users;
using TaskFlow.Infrastructure.Persistence;
using TaskFlow.Infrastructure.Persistence.Repositories;
using TaskFlow.Infrastructure.Services;

public static class DependencyInjection {

    public static IServiceCollection AddInfrastructureServices(this IServiceCollection services, IConfiguration configuration) {

        var connectionString = configuration.GetConnectionString("DefaultConnection");
        var useInMemoryDatabase = string.IsNullOrWhiteSpace(connectionString);

        if (useInMemoryDatabase) {

            services.AddDbContext<ApplicationDbContext>(options =>
                options.UseInMemoryDatabase("TaskFlowDb"));
        }
        else {

            services.AddDbContext<ApplicationDbContext>(options =>
                options.UseSqlServer(connectionString));
        }

        services.AddScoped<IUnitOfWork>(provider => provider.GetRequiredService<ApplicationDbContext>());
        services.AddScoped<ITaskRepository, TaskRepository>();
        services.AddScoped<IUserRepository, UserRepository>();

        // Add Identity services
        services.AddIdentity<ApplicationUser, IdentityRole<Guid>>()
                .AddEntityFrameworkStores<ApplicationDbContext>()
                .AddDefaultTokenProviders();

        // Register custom services
        services.AddScoped<IAuthService, AuthService>();
        services.AddScoped<ICurrentUserService, CurrentUserService>();

        // Add HttpContextAccessor for ICurrentUserService
        services.AddHttpContextAccessor();

        return services;
    }
}
