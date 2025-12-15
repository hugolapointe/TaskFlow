namespace TaskFlow.Application.UseCases.Tasks.GetTasksByTag;

using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using AutoMapper;
using MediatR;
using TaskFlow.Application.Common.Interfaces;
using TaskFlow.Application.Common.Models;

public sealed class GetTasksByTagHandler(ITaskRepository repository, IMapper mapper)
 : IRequestHandler<GetTasksByTagQuery, PaginatedResult<TaskItem>>
{
 public async Task<PaginatedResult<TaskItem>> Handle(GetTasksByTagQuery request, CancellationToken cancellationToken)
 {
 var items = await repository.GetByTagAsync(request.Tag, request.Limit, request.AfterCursor, cancellationToken);
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
