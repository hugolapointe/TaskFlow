namespace TaskFlow.Application.UseCases.Admin.GetUsers;

using MediatR;
using TaskFlow.Application.Common.Models;

public sealed record GetUsersQuery(int Limit =20, string? AfterCursor = null) : IRequest<PaginatedResult<UserProfile>>;
