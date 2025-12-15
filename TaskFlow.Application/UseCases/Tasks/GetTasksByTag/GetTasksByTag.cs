namespace TaskFlow.Application.UseCases.Tasks.GetTasksByTag;

using MediatR;
using TaskFlow.Application.Common.Models;

public sealed record GetTasksByTagQuery(string Tag, int Limit =20, string? AfterCursor = null)
 : IRequest<PaginatedResult<TaskItem>>;
