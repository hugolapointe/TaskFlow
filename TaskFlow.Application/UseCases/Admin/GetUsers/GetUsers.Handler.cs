namespace TaskFlow.Application.UseCases.Admin.GetUsers;

using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using MediatR;
using TaskFlow.Application.Common.Interfaces;
using TaskFlow.Application.Common.Models;

public sealed class GetUsersHandler(IUserRepository users) : IRequestHandler<GetUsersQuery, PaginatedResult<UserProfile>>
{
 public async Task<PaginatedResult<UserProfile>> Handle(GetUsersQuery request, CancellationToken cancellationToken)
 {
 var list = await users.GetUsersAsync(request.Limit, request.AfterCursor, cancellationToken);
 var profiles = list.Select(u => new UserProfile
 {
 Id = u.Id,
 Name = u.Name,
 Email = u.Email,
 Roles = Array.Empty<string>()
 }).ToList();
 return new PaginatedResult<UserProfile>
 {
 Items = profiles,
 NextCursor = null,
 PrevCursor = null,
 TotalCount = null
 };
 }
}
