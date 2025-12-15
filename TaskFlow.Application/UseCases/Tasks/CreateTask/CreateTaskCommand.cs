namespace TaskFlow.Application.UseCases.Tasks.CreateTask;

using System;
using MediatR;
using TaskFlow.Application.Common.Interfaces;
using TaskFlow.Application.Common.Models;
using TaskFlow.Domain.Tasks;

public sealed record CreateTaskCommand(string Description, TaskImportance Importance, DateTime? DueDate, DateTime? ScheduledAt)
 : IRequest<TaskDetails>, IRequireTaskOwnership
{
 public Guid OwnerId { get; init; }
}
