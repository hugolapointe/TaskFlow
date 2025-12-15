namespace TaskFlow.Application.UseCases.Auth.GetCurrentUser;

using MediatR;
using TaskFlow.Application.Common.Models;

public sealed record GetCurrentUserQuery : IRequest<UserProfile>;
