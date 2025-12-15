namespace TaskFlow.Application.UseCases.Tasks.ArchiveTask;

using System.Threading;
using System.Threading.Tasks;

using AutoMapper;

using MediatR;

using TaskFlow.Application.Common.Exceptions;
using TaskFlow.Application.Common.Interfaces;
using TaskFlow.Application.Common.Models;

public sealed class ArchiveTaskHandler(
    ITaskRepository repository,
    IMapper mapper
) : IRequestHandler<ArchiveTaskCommand, TaskDetails> {

    public async Task<TaskDetails> Handle(ArchiveTaskCommand request, CancellationToken cancellationToken) {
        var task = await repository.GetByIdAsync(request.TaskId, cancellationToken)
            ?? throw new NotFoundException("Task", request.TaskId);
        
        task.Archive();

        await repository.UpdateAsync(task, cancellationToken);
        return mapper.Map<TaskDetails>(task);
    }
}
