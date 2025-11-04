using TaskFlow.Core.Domain.Interfaces;

namespace TaskFlow.Core.Domain.Entities;

public abstract class AuditableEntity : IAuditable {
    public DateTime CreatedAt { get; set; }
    public DateTime UpdatedAt { get; set; }
}
