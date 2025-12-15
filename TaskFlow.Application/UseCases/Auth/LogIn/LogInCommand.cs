namespace TaskFlow.Application.UseCases.Auth.LogIn;

using MediatR;

public sealed record LogInCommand(string Email, string Password) : IRequest<string>;
