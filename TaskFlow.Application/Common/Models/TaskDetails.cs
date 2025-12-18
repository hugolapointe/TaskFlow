namespace TaskFlow.Application.Common.Models;

using System;
using System.Collections.Generic;

using TaskFlow.Domain.Tasks;

public sealed class TaskDetails {

    public Guid Id { get; init; }
    public Guid OwnerId { get; init; }
    public string Description { get; init; } = string.Empty;
    public TaskImportance Importance { get; init; }
    public DateTime? DueDate { get; init; }
    public DateTime? ScheduledAt { get; init; }
    public TaskStatus Status { get; init; }
    public bool IsPending { get; init; }
    public bool IsScheduled { get; init; }
    public bool IsInProgress { get; init; }
    public bool IsCompleted { get; init; }
    public DateTime CreatedAt { get; init; }
    public Guid CreatedBy { get; init; }
    public DateTime LastUpdatedAt { get; init; }
    public Guid LastUpdatedBy { get; init; }
    public DateTime? CompletedAt { get; init; }
    public IReadOnlyCollection<string> Tags { get; init; } = Array.Empty<string>();
}
