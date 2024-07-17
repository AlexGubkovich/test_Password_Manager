using FluentValidation;
using TestRESTApp.Data;
using Microsoft.EntityFrameworkCore;
using Ardalis.Result.AspNetCore;

var builder = WebApplication.CreateBuilder(args);
var services = builder.Services;

services.AddControllers(mvcOptions => mvcOptions.AddDefaultResultConvention());
services.AddEndpointsApiExplorer();
services.AddSwaggerGen();

services.AddDbContext<AppDbContext>(x =>
{
    var connString = builder.Configuration.GetConnectionString("Postgres");
    x.UseNpgsql(connString);
});

services.AddValidatorsFromAssemblyContaining<Program>(ServiceLifetime.Singleton);
services.AddMediatR(x => x.RegisterServicesFromAssemblyContaining<Program>());

services.AddCors(setup => 
    setup.AddPolicy("AllowAll",
        builder => builder.AllowAnyOrigin()
            .AllowAnyHeader()
            .AllowAnyMethod()));

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseCors("AllowAll");

app.MapControllers();

if (app.Environment.IsProduction())
{
    app.MigrationInit();
}

app.Run();