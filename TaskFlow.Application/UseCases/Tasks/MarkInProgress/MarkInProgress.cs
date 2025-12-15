namespace TaskFlow.Application.UseCases.Tasks.MarkInProgress;

using System;
using MediatR;
using TaskFlow.Application.Common.Interfaces;
using TaskFlow.Application.Common.Models;

public sealed record MarkInProgressCommand(Guid TaskId) : IRequest<TaskDetails>, IRequireTaskOwnership
{
 public Guid OwnerId { get; init; }
}
