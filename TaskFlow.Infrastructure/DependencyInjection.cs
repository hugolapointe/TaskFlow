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

    private const string DatabaseName = "TaskFlowDb";

    public static IServiceCollection AddInfrastructureServices(this IServiceCollection services, IConfiguration configuration) {

        ConfigureDatabase(services, configuration);

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

    private static void ConfigureDatabase(IServiceCollection services, IConfiguration configuration) {

        var useInMemoryDatabase = configuration.GetValue<bool>("UseInMemoryDatabase");
        var connectionString = configuration.GetConnectionString("DefaultConnection");

        if (useInMemoryDatabase) {

            services.AddDbContext<ApplicationDbContext>(options =>
                options.UseInMemoryDatabase(DatabaseName));
        }
        else {

            if (string.IsNullOrWhiteSpace(connectionString)) {

                throw new InvalidOperationException(
                    "Connection string 'DefaultConnection' is required when UseInMemoryDatabase is false. " +
                    "Please configure a valid connection string in appsettings.json.");
            }

            if (!connectionString.Contains("Server=", StringComparison.OrdinalIgnoreCase) &&
                !connectionString.Contains("Data Source=", StringComparison.OrdinalIgnoreCase)) {

                throw new InvalidOperationException(
                    "Connection string 'DefaultConnection' appears to be malformed. " +
                    "It must contain either 'Server=' or 'Data Source='.");
            }

            services.AddDbContext<ApplicationDbContext>(options =>
                options.UseSqlServer(connectionString));
        }
    }
}
