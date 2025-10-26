using Microsoft.EntityFrameworkCore;

using TaskFlow.Core;
using TaskFlow.Core.Data;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container
builder.Services.AddTaskFlowCore(options =>
    options.UseInMemoryDatabase("TaskFlowDb"));

builder.Services.AddControllers();

// Configure CORS to allow all origins for testing
builder.Services.AddCors(options => {
    options.AddPolicy("AllowAll", policy => {
        policy.AllowAnyOrigin()
              .AllowAnyMethod()
              .AllowAnyHeader();
    });
});

// Add Swagger/OpenAPI
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// Configure the HTTP request pipeline
if (app.Environment.IsDevelopment()) {
    app.UseSwagger();
    app.UseSwaggerUI(c => {
        c.SwaggerEndpoint("/swagger/v1/swagger.json", "TaskFlow API V1");
    });

    using var scope = app.Services.CreateScope();
    await DbSeeder.SeedAsync(scope.ServiceProvider.GetRequiredService<TaskFlowDbContext>());
}

// Optional: remove or comment out if you want to test HTTP easily
app.UseHttpsRedirection();

// Enable CORS before Authorization
app.UseCors("AllowAll");

app.UseAuthorization();

app.MapControllers();

// Minimal test endpoint to verify server is running
app.MapGet("/", () => "API is running!");

app.Run();
