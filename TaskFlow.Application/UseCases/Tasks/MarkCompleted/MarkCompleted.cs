namespace TaskFlow.Application.UseCases.Tasks.MarkCompleted;

using System;
using MediatR;
using TaskFlow.Application.Common.Interfaces;
using TaskFlow.Application.Common.Models;

public sealed record MarkCompletedCommand(Guid TaskId) : IRequest<TaskDetails>, IRequireTaskOwnership
{
 public Guid OwnerId { get; init; }
}
