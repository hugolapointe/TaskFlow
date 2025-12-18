namespace TaskFlow.Infrastructure.Persistence.Repositories;

using System;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using TaskFlow.Application.Common.Interfaces;
using TaskFlow.Application.Common.Models;
using TaskFlow.Domain.Users;

public class UserRepository : IUserRepository
{
    private readonly UserManager<ApplicationUser> _userManager;
    private readonly ApplicationDbContext _context; // For custom pagination

    public UserRepository(UserManager<ApplicationUser> userManager, ApplicationDbContext context)
    {
        _userManager = userManager;
        _context = context;
    }

    public async Task<ApplicationUser?> GetByIdAsync(Guid id, CancellationToken ct)
    {
        return await _userManager.FindByIdAsync(id.ToString());
    }

    public async Task<ApplicationUser?> GetByEmailAsync(string email, CancellationToken ct)
    {
        return await _userManager.FindByEmailAsync(email);
    }

    public async Task AddAsync(ApplicationUser user, CancellationToken ct)
    {
        // UserManager.CreateAsync handles saving to DB
        var result = await _userManager.CreateAsync(user);
        if (!result.Succeeded)
        {
            // Optionally throw an exception or handle errors
            throw new InvalidOperationException($"Failed to create user: {string.Join(", ", result.Errors.Select(e => e.Description))}");
        }
    }

    public async Task UpdateAsync(ApplicationUser user, CancellationToken ct)
    {
        // UserManager.UpdateAsync handles saving to DB
        var result = await _userManager.UpdateAsync(user);
        if (!result.Succeeded)
        {
            // Optionally throw an exception or handle errors
            throw new InvalidOperationException($"Failed to update user: {string.Join(", ", result.Errors.Select(e => e.Description))}");
        }
    }

    public async Task<PaginatedResult<ApplicationUser>> GetUsersAsync(int limit, string? afterCursor, CancellationToken ct)
    {
        IQueryable<ApplicationUser> query = _context.Users.OrderBy(u => u.Id); // Default sort by Id for cursor

        if (!string.IsNullOrEmpty(afterCursor) && Guid.TryParse(afterCursor, out Guid cursorId))
        {
            query = query.Where(u => u.Id.CompareTo(cursorId) > 0);
        }

        var users = await query
            .Take(limit)
            .ToListAsync(ct);

        var hasNextPage = users.Count == limit;

        return new PaginatedResult<ApplicationUser>
        {
            Items = users,
            NextCursor = hasNextPage ? users.LastOrDefault()?.Id.ToString() : null
        };
    }
}
