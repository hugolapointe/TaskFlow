namespace TaskFlow.Application.UseCases.Tasks.UpdateTask;

using System;
using MediatR;
using TaskFlow.Application.Common.Interfaces;
using TaskFlow.Application.Common.Models;
using TaskFlow.Domain.Tasks;

public sealed record UpdateTaskCommand(Guid TaskId, string Description, TaskImportance Importance, DateTime? DueDate)
 : IRequest<TaskDetails>, IRequireTaskOwnership
{
 public Guid OwnerId { get; init; }
}
