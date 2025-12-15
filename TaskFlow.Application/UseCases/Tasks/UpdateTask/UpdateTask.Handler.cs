namespace TaskFlow.Application.UseCases.Tasks.UpdateTask;

using System.Threading;
using System.Threading.Tasks;

using AutoMapper;

using MediatR;

using TaskFlow.Application.Common.Exceptions;
using TaskFlow.Application.Common.Interfaces;
using TaskFlow.Application.Common.Models;

public sealed class UpdateTaskHandler(ITaskRepository repository, IMapper mapper)
 : IRequestHandler<UpdateTaskCommand, TaskDetails> {
    public async Task<TaskDetails> Handle(UpdateTaskCommand request, CancellationToken cancellationToken) {
        var task = await repository.GetByIdAsync(request.TaskId, cancellationToken)
        ?? throw new NotFoundException("Task", request.TaskId);
        task.Update(request.Description, request.Importance, request.DueDate);
        await repository.UpdateAsync(task, cancellationToken);
        return mapper.Map<TaskDetails>(task);
    }
}
