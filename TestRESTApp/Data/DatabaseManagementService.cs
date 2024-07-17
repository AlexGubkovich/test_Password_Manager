using Microsoft.EntityFrameworkCore;

namespace TestRESTApp.Data;

public static class DatabaseManagementService
{
    public static void MigrationInit(this IApplicationBuilder app)
    {
        using var serviceScope = app.ApplicationServices.CreateScope();

        serviceScope.ServiceProvider.GetRequiredService<AppDbContext>().Database.Migrate();
    }
}
