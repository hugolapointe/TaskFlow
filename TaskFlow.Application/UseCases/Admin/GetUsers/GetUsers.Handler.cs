namespace TaskFlow.Application.UseCases.Admin.GetUsers;

using System.Linq;
using System.Threading;
using System.Threading.Tasks;

using MediatR;

using TaskFlow.Application.Common.Interfaces;
using TaskFlow.Application.Common.Models;

public sealed class GetUsersHandler(IUserRepository users) : IRequestHandler<GetUsersQuery, PaginatedResult<UserProfile>> {

    public async Task<PaginatedResult<UserProfile>> Handle(GetUsersQuery request, CancellationToken cancellationToken) {
        var paginatedUsers = await users.GetUsersAsync(request.Limit, request.AfterCursor, cancellationToken);
        var profiles = paginatedUsers.Items.Select(u => new UserProfile {
            Id = u.Id,
            Name = u.Name,
            Email = u.Email!,
            // TODO: Roles will be populated once Identity is integrated
            Roles = Array.Empty<string>()
        }).ToList();
        return new PaginatedResult<UserProfile> {
            Items = profiles,
            NextCursor = paginatedUsers.NextCursor,
            PrevCursor = paginatedUsers.PrevCursor,
            TotalCount = paginatedUsers.TotalCount
        };
    }
}
