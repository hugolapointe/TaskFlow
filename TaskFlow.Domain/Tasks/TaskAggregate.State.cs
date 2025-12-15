namespace TaskFlow.Domain.Tasks;

using System;

public partial class TaskAggregate {

    public void Update(string description, TaskImportance importance, DateTime? dueDate) {

        TaskGuards.EnsureValidDescription(description);

        Description = description!.Trim();
        Importance = importance;
        DueDate = dueDate;
    }

    public void ScheduleFor(DateTime scheduledAt) {

        ScheduledAt = scheduledAt;

        if (Status != TaskStatus.Completed) {
            Status = TaskStatus.Scheduled;
        }
    }

    public void Unschedule() {

        ScheduledAt = null;

        if (Status != TaskStatus.Completed) {
            Status = TaskStatus.Pending;
        }
    }

    public void MarkInProgress() {

        TaskGuards.EnsureNotCompleted(Status);

        Status = TaskStatus.InProgress;
    }

    public void MarkCompleted() {

        Status = TaskStatus.Completed;
        CompletedAt = DateTime.UtcNow;
    }

    public void Archive() {

        IsArchived = true;
    }
}
