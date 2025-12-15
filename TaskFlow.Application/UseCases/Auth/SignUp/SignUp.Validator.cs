namespace TaskFlow.Application.UseCases.Auth.SignUp;

using FluentValidation;

public sealed class SignUpValidator : AbstractValidator<SignUpCommand>
{
 public SignUpValidator()
 {
 RuleFor(x => x.Email).NotEmpty().EmailAddress();
 RuleFor(x => x.Name).NotEmpty().MaximumLength(128);
 RuleFor(x => x.Password).NotEmpty().MinimumLength(6).MaximumLength(128);
 }
}
