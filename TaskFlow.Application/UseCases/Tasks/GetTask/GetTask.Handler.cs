namespace TaskFlow.Application.UseCases.Tasks.GetTask;

using System.Threading;
using System.Threading.Tasks;
using AutoMapper;
using MediatR;
using TaskFlow.Application.Common.Exceptions;
using TaskFlow.Application.Common.Interfaces;
using TaskFlow.Application.Common.Models;

public sealed class GetTaskHandler : IRequestHandler<GetTaskQuery, TaskDetails>
{
 private readonly ITaskRepository _repo;
 private readonly IMapper _mapper;

 public GetTaskHandler(ITaskRepository repo, IMapper mapper)
 {
 _repo = repo;
 _mapper = mapper;
 }

 public async Task<TaskDetails> Handle(GetTaskQuery request, CancellationToken cancellationToken)
 {
 var task = await _repo.GetByIdAsync(request.TaskId, cancellationToken) ?? throw new NotFoundException("Task", request.TaskId);
 return _mapper.Map<TaskDetails>(task);
 }
}
