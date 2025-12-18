namespace TaskFlow.Domain.Tasks;

using System;
using System.Collections.Generic;

using TaskFlow.Domain.Common;

public partial class TaskAggregate : AggregateRoot<Guid>, IOwnedBy, IArchivable, IAuditable {

    // Core Properties
    public string Description { get; private set; } = string.Empty;
    public TaskImportance Importance { get; private set; }
    public DateTime? DueDate { get; private set; }
    public DateTime? ScheduledAt { get; private set; }
    public DateTime? CompletedAt { get; private set; }
    public TaskStatus Status { get; private set; }

    // Derived Status Flags
    public bool IsPending => Status == TaskStatus.Pending;
    public bool IsScheduled => Status == TaskStatus.Scheduled;
    public bool IsInProgress => Status == TaskStatus.InProgress;
    public bool IsCompleted => Status == TaskStatus.Completed;

    // Archival Property
    public bool IsArchived { get; private set; }

    // Ownership Property
    public Guid OwnerId { get; private set; }

    // Auditing Properties
    public DateTime CreatedAt { get; private set; }
    public Guid CreatedBy { get; private set; }
    public DateTime LastUpdatedAt { get; private set; }
    public Guid LastUpdatedBy { get; private set; }

    private TaskAggregate() { }

    private TaskAggregate(
    Guid id,
    string description,
    TaskImportance importance,
    Guid ownerId,
    DateTime? dueDate = null,
    DateTime? scheduledAt = null) {

        TaskGuards.EnsureValidDescription(description);

        Id = id;
        OwnerId = ownerId;
        Description = description!.Trim();
        Importance = importance;
        DueDate = dueDate;
        ScheduledAt = scheduledAt;
        Status = scheduledAt.HasValue ? TaskStatus.Scheduled : TaskStatus.Pending;
        CreatedAt = DateTime.UtcNow;
        LastUpdatedAt = CreatedAt;
    }

    public static TaskAggregate Create(
    string description,
    TaskImportance importance,
    Guid ownerId,
    DateTime? dueDate = null,
    DateTime? scheduledAt = null) {

        return new TaskAggregate(Guid.NewGuid(), description, importance, ownerId, dueDate, scheduledAt);
    }
}
