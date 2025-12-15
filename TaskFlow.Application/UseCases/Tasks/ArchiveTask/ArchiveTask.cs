namespace TaskFlow.Application.UseCases.Tasks.ArchiveTask;

using System;

using MediatR;

using TaskFlow.Application.Common.Interfaces;
using TaskFlow.Application.Common.Models;

public sealed record ArchiveTaskCommand(Guid TaskId) : IRequest<TaskDetails>, IRequireTaskOwnership {
    public Guid OwnerId { get; init; }
}
