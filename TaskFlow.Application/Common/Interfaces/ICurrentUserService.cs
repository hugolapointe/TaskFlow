namespace TaskFlow.Application.Common.Interfaces;

using System;
using System.Collections.Generic;

public interface ICurrentUserService {
    Guid? UserId { get; }
    bool IsAuthenticated { get; }
    IReadOnlyCollection<string> Roles { get; }
    string? Email { get; }
    string? Name { get; }
}
