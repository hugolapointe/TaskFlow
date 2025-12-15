namespace TaskFlow.Application.UseCases.Auth.SignUp;

using MediatR;

public sealed record SignUpCommand(string Email, string Name, string Password) : IRequest<Guid>;
