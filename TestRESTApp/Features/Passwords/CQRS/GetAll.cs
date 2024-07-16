using Microsoft.EntityFrameworkCore;
using TestRESTApp.Data;
using TestRESTApp.Features.Passwords.DTO;

namespace TestRESTApp.Features.Passwords.CQRS;

public static class GetAll
{
    public class Query : IRequest<PasswordDto[]>
    {
        public readonly static Query Instance = new();

        private Query() { }
    }

    internal sealed class Handler : IRequestHandler<Query, PasswordDto[]>
    {
        private readonly AppDbContext dbContext;

        public Handler(AppDbContext dbContext)
        {
            this.dbContext = dbContext;
        }

        public async Task<PasswordDto[]> Handle(Query request, CancellationToken cancellationToken)
        {
            return await dbContext.Passwords
                .OrderByDescending(x => x.CreationDate)
                .Select(x => new PasswordDto(x.Name, x.Value, x.CreationDate))
                .ToArrayAsync(cancellationToken);
        }
    }
}
