namespace TaskFlow.Application.Common.Models;

using System;
using System.Collections.Generic;

public sealed class UserProfile
{
 public Guid Id { get; init; }
 public string Name { get; init; } = string.Empty;
 public string Email { get; init; } = string.Empty;
 public IReadOnlyCollection<string> Roles { get; init; } = Array.Empty<string>();
}
