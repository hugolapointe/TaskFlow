namespace TaskFlow.Application.Common.Interfaces;

using System;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using TaskFlow.Domain.Users;

public interface IUserRepository
{
 Task<ApplicationUser?> GetByIdAsync(Guid id, CancellationToken ct);
 Task<ApplicationUser?> GetByEmailAsync(string email, CancellationToken ct);
 Task AddAsync(ApplicationUser user, CancellationToken ct);
 Task UpdateAsync(ApplicationUser user, CancellationToken ct);
 Task<PaginatedResult<ApplicationUser>> GetUsersAsync(int limit, string? afterCursor, CancellationToken ct);
}
