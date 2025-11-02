using Microsoft.EntityFrameworkCore;
using TaskFlow.Core;
using TaskFlow.Core.Data;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddTaskFlowCore(options =>
    options.UseInMemoryDatabase("TaskFlowDb"));

builder.Services.AddControllers();

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

app.UseSwagger();
app.UseSwaggerUI();

if (app.Environment.IsDevelopment()) {
    using var scope = app.Services.CreateScope();
    var dbContext = scope.ServiceProvider.GetRequiredService<TaskFlowDbContext>();
    await DbSeeder.SeedAsync(dbContext);
}

if (!app.Environment.IsDevelopment()) {
    app.UseHttpsRedirection();
}

app.UseCors("AllowReactApp");
app.UseAuthorization();
app.MapControllers();

app.Run();
