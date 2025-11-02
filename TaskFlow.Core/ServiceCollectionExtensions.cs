using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using TaskFlow.Core.Data;
using TaskFlow.Core.Domain.Repositories;
using TaskFlow.Core.Domain.Services;

namespace TaskFlow.Core;

public static class ServiceCollectionExtensions {
    public static IServiceCollection AddTaskFlowCore(
        this IServiceCollection services,
   Action<DbContextOptionsBuilder> dbOptionsAction) {

        services.AddDbContext<TaskFlowDbContext>(dbOptionsAction);
     services.AddScoped<ToDoRepository>();
      services.AddScoped<ToDoService>();

      return services;
    }
}