namespace TaskFlow.Infrastructure.Services;

using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;

using Microsoft.AspNetCore.Http;

using TaskFlow.Application.Common.Interfaces;

public class CurrentUserService(IHttpContextAccessor httpContextAccessor) : ICurrentUserService {

    private ClaimsPrincipal? User => httpContextAccessor.HttpContext?.User;

    public Guid? UserId => User?.FindFirstValue(ClaimTypes.NameIdentifier) is string id && Guid.TryParse(id, out Guid userId) ? userId : null;

    public bool IsAuthenticated => User?.Identity?.IsAuthenticated ?? false;

    public IReadOnlyCollection<string> Roles => User?.FindAll(ClaimTypes.Role) is IEnumerable<Claim> roleClaims
        ? Array.AsReadOnly(roleClaims.Select(c => c.Value).ToArray())
        : Array.AsReadOnly(Array.Empty<string>());

    public string? Email => User?.FindFirstValue(ClaimTypes.Email);

    public string? Name => User?.FindFirstValue(ClaimTypes.Name);
}
