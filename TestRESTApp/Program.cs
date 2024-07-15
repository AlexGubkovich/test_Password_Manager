using FluentValidation;
using TestRESTApp.Data;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);
var services = builder.Services;

services.AddControllers();
services.AddEndpointsApiExplorer();
services.AddSwaggerGen();

services.AddDbContext<AppDbContext>(x => x.UseInMemoryDatabase("In_Memeory_DB"));

services.AddValidatorsFromAssemblyContaining<Program>(ServiceLifetime.Singleton);
services.AddMediatR(x => x.RegisterServicesFromAssemblyContaining<Program>());

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.MapControllers();

app.Run();