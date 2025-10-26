using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;

using TaskFlow.Core.Data;
using TaskFlow.Core.Domain.Services;

namespace TaskFlow.Core;

public static class ServiceCollectionExtensions {
    public static IServiceCollection AddTaskFlowCore(
        this IServiceCollection services,
        Action<DbContextOptionsBuilder> dbOptionsAction) {

        // Data
        services.AddDbContext<TaskFlowDbContext>(dbOptionsAction);

        // Services
        services.AddScoped<ToDoService>();

        return services;
    }
}