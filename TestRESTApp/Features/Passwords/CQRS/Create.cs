using Ardalis.Result.FluentValidation;
using FluentValidation;
using Microsoft.EntityFrameworkCore;
using TestRESTApp.Data;
using TestRESTApp.Entities;

namespace TestRESTApp.Features.Passwords.CQRS;

public static class Create
{
    public record Command(string Name, string Value, PasswordPurposeType Purpose) : IRequest<Result>;

    internal sealed class Handler : IRequestHandler<Command, Result>
    {
        private readonly AppDbContext dbContext;
        private readonly IValidator<Command> commandValidator;

        public Handler(AppDbContext dbContext, IValidator<Command> commandValidator)
        {
            this.dbContext = dbContext;
            this.commandValidator = commandValidator;
        }

        public async Task<Result> Handle(Command request, CancellationToken cancellationToken)
        {
            var isNameTaken = await dbContext.Passwords
                .AnyAsync(x => x.Name == request.Name, cancellationToken);

            if (isNameTaken)
                return Result.Invalid(new ValidationError($"Name {request.Name} is already taken."));

            var validation = await commandValidator.ValidateAsync(request, cancellationToken);
            if (!validation.IsValid)
            {
                return Result.Invalid(validation.AsErrors());
            }

            var newPassword = new Password
            {
                Name = request.Name,
                Value = request.Value,
                CreationTime = DateTime.UtcNow,
                Purpose = request.Purpose
            };

            dbContext.Passwords.Add(newPassword);
            await dbContext.SaveChangesAsync(cancellationToken);

            return Result.Success();
        }
    }

    public class Validator : AbstractValidator<Command>
    {
        public Validator()
        {
            RuleFor(x => x.Name)
                .NotEmpty();

            RuleFor(x => x.Value)
                .NotEmpty()
                .MinimumLength(8);

            RuleFor(x => x.Name)
                .EmailAddress()
                .When(x => x.Purpose == PasswordPurposeType.Email)
                .WithMessage($"Since Purpose is {PasswordPurposeType.Email}, Name must be in mail format.");
        }
    }
}
