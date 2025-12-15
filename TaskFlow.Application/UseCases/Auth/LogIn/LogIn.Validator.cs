namespace TaskFlow.Application.UseCases.Auth.LogIn;

using FluentValidation;

public sealed class LogInValidator : AbstractValidator<LogInCommand>
{
 public LogInValidator()
 {
 RuleFor(x => x.Email).NotEmpty().EmailAddress();
 RuleFor(x => x.Password).NotEmpty().MinimumLength(6).MaximumLength(128);
 }
}
