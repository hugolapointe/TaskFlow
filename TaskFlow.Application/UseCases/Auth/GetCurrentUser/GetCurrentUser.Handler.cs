namespace TaskFlow.Application.UseCases.Auth.GetCurrentUser;

using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using MediatR;
using TaskFlow.Application.Common.Interfaces;
using TaskFlow.Application.Common.Models;

public sealed class GetCurrentUserHandler(ICurrentUserService currentUser) : IRequestHandler<GetCurrentUserQuery, UserProfile>
{
 public Task<UserProfile> Handle(GetCurrentUserQuery request, CancellationToken cancellationToken)
 {
 var id = currentUser.UserId ?? Guid.Empty;
 return Task.FromResult(new UserProfile
 {
 Id = id,
 Name = currentUser.Name ?? string.Empty,
 Email = currentUser.Email ?? string.Empty,
 Roles = Array.Empty<string>()
 });
 }
}
