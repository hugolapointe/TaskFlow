using Microsoft.EntityFrameworkCore;
using Microsoft.OpenApi.Models;
using System.Reflection;

using TaskFlow.Core;
using TaskFlow.Core.Data;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddTaskFlowCore(options =>
    options.UseInMemoryDatabase("TaskFlowDb"));

builder.Services.AddControllers()
    .AddJsonOptions(options => {
        options.JsonSerializerOptions.PropertyNamingPolicy = System.Text.Json.JsonNamingPolicy.CamelCase;
        options.JsonSerializerOptions.WriteIndented = true;
    });

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(options => {
    options.SwaggerDoc("v1", new OpenApiInfo {
        Version = "v1",
        Title = "TaskFlow API",
        Contact = new OpenApiContact {
   Name = "TaskFlow Support",
   Url = new Uri("https://github.com/hugolapointe/TaskFlow.WebAPI")
 }
    });

    var xmlFilename = $"{Assembly.GetExecutingAssembly().GetName().Name}.xml";
    var xmlPath = Path.Combine(AppContext.BaseDirectory, xmlFilename);
    options.IncludeXmlComments(xmlPath);
});

builder.Services.AddCors(options => {
  options.AddPolicy("AllowReactApp", policy => {
   if (builder.Environment.IsDevelopment()) {
       policy.AllowAnyOrigin()
        .AllowAnyMethod()
     .AllowAnyHeader();
        }
    });
});

var app = builder.Build();

app.UseSwagger();
app.UseSwaggerUI(options => {
    options.SwaggerEndpoint("/swagger/v1/swagger.json", "TaskFlow API v1");
    options.RoutePrefix = "swagger";
});

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
