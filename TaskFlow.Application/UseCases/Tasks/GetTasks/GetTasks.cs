namespace TaskFlow.Application.UseCases.Tasks.GetTasks;

using System;

using MediatR;

using TaskFlow.Application.Common.Models;
using TaskFlow.Domain.Tasks;

public sealed record GetTasksQuery(
 TaskStatus? Status,
 TaskImportance? Importance,
 DateTime? ScheduledAt,
 string? Search,
 TaskSortBy SortBy,
 bool Desc,
 int Limit = 20,
 string? AfterCursor = null) : IRequest<PaginatedResult<TaskItem>>;
