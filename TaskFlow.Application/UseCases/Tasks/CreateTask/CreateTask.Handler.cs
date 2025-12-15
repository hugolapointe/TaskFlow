namespace TaskFlow.Application.UseCases.Tasks.CreateTask;

using System.Threading;
using System.Threading.Tasks;
using AutoMapper;
using MediatR;
using TaskFlow.Application.Common.Exceptions;
using TaskFlow.Application.Common.Interfaces;
using TaskFlow.Application.Common.Models;
using TaskFlow.Domain.Tasks;

public sealed class CreateTaskHandler(ITaskRepository repository, IMapper mapper, ICurrentUserService currentUser)
 : IRequestHandler<CreateTaskCommand, TaskDetails>
{
 public async Task<TaskDetails> Handle(CreateTaskCommand request, CancellationToken cancellationToken)
 {
 var ownerId = currentUser.UserId ?? throw new ForbiddenAccessException();
 var task = TaskAggregate.Create(request.Description, request.Importance, ownerId, request.DueDate, request.ScheduledAt);
 await repository.AddAsync(task, cancellationToken);
 return mapper.Map<TaskDetails>(task);
 }
}
