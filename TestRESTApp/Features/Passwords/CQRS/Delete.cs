using TestRESTApp.Data;

namespace TestRESTApp.Features.Passwords.CQRS;

public static class Delete
{
    public record Command(string PasswordName) : IRequest<Result>;

    internal sealed class Handler : IRequestHandler<Command, Result>
    {
        private readonly AppDbContext dbContext;

        public Handler(AppDbContext dbContext)
        {
            this.dbContext = dbContext;
        }

        public async Task<Result> Handle(Command request, CancellationToken cancellationToken)
        {
            var password = await dbContext.Passwords.FindAsync(request.PasswordName, cancellationToken);

            if (password == null) {
                return Result.NotFound();
            }

            dbContext.Passwords.Remove(password);
            await dbContext.SaveChangesAsync();

            return Result.Success();
        }
    }
}
