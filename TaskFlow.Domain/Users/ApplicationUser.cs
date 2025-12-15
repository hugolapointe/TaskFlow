namespace TaskFlow.Domain.Users;

using System;
using Microsoft.AspNetCore.Identity;
using TaskFlow.Domain.Common;

public class ApplicationUser : IdentityUser<Guid>, IArchivable
{
    // Core Properties
    public string Name { get; set; } = string.Empty;

    // Archival Property
    public bool IsArchived { get; private set; }

    public void Archive()
    {
        IsArchived = true;
    }
}
