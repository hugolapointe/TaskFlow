namespace TaskFlow.Application.UseCases.Tasks.MarkInProgress;

using System.Threading;
using System.Threading.Tasks;

using AutoMapper;

using MediatR;

using TaskFlow.Application.Common.Exceptions;
using TaskFlow.Application.Common.Interfaces;
using TaskFlow.Application.Common.Models;

public sealed class MarkInProgressHandler(ITaskRepository repository, IMapper mapper)
 : IRequestHandler<MarkInProgressCommand, TaskDetails> {
    public async Task<TaskDetails> Handle(MarkInProgressCommand request, CancellationToken cancellationToken) {
        var task = await repository.GetByIdAsync(request.TaskId, cancellationToken)
        ?? throw new NotFoundException("Task", request.TaskId);
        task.MarkInProgress();
        await repository.UpdateAsync(task, cancellationToken);
        return mapper.Map<TaskDetails>(task);
    }
}
