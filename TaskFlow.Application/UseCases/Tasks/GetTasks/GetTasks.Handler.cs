namespace TaskFlow.Application.UseCases.Tasks.GetTasks;

using System.Linq;
using System.Threading;
using System.Threading.Tasks;

using AutoMapper;

using MediatR;

using TaskFlow.Application.Common.Interfaces;
using TaskFlow.Application.Common.Models;

public sealed class GetTasksHandler(ITaskRepository repository, IMapper mapper)
 : IRequestHandler<GetTasksQuery, PaginatedResult<TaskItem>>
{
 public async Task<PaginatedResult<TaskItem>> Handle(GetTasksQuery request, CancellationToken cancellationToken)
 {
 var items = await repository.SearchAsync(
 search: request.Search,
 status: request.Status,
 importance: request.Importance,
 scheduledAt: request.ScheduledAt,
 sortBy: request.SortBy,
 desc: request.Desc,
 limit: request.Limit,
 afterCursor: request.AfterCursor,
 ct: cancellationToken);

 var mapped = items.Select(t => mapper.Map<TaskItem>(t)).ToList();
 return new PaginatedResult<TaskItem>
 {
 Items = mapped,
 NextCursor = null,
 PrevCursor = null,
 TotalCount = null
 };
 }
}
